import { useRef, useEffect } from "react";
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from "ogl";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(
  gl,
  text,
  font = "bold 50px monospace",
  color = "black"
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = "white",
    font = "100px  poppins",
  }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    );
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        // Rounded box SDF for UV space
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          // Apply rounded corners (assumes vUv in [0,1])
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }
          
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [
        img.naturalWidth,
        img.naturalHeight,
      ];
    };
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      fontFamily: this.font,
    });
  }
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [
          this.viewport.width,
          this.viewport.height,
        ];
      }
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y =
      (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(
    container,
    {
      items,
      bend,
      textColor = "#ffffff",
      borderRadius = 0,
      font = " 90px poppins",
    } = {}
  ) {
    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.scroll = { ease: 0.05, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }
  createRenderer() {
    this.renderer = new Renderer({ alpha: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    this.scene = new Transform();
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }
  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const defaultItems = [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1200px-C_Programming_Language.svg.png",
        text: "C",
      },
      {
        image:
          "https://static.vecteezy.com/system/resources/previews/048/332/150/non_2x/java-programming-language-java-logo-free-png.png",
        text: "Java",
      },
      {
        image: "/Skills_Imgs/Javascript.jpg",
        text: "JavaScript",
      },

      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEc9A_S6BPxCDRp5WjMFEfXrpCu1ya2OO-Lw&s",
        text: "HTML",
      },
      {
        image: "/Skills_Imgs/CSS.png",
        text: "CSS",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1I3OubNV7mVCMcnxQM5i-Kg04VEAulwc_Kg&s",
        text: "TypeScript",
      },
      {
        image: "/Skills_Imgs/express-js.png",
        text: "Express JS",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJ3p4FivDqCZTB1-DsPtRekb0QAUqt_chfw&s",
        text: "Three JS",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLqJK4zR_ma7L4d9RZhKIyVaaTvKuB6ps_wA&s",
        text: "R",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/2560px-Bootstrap_logo.svg.png",
        text: "Bootstrap",
      },
      {
        image:
          "data:image/png;base64,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",
        text: "Tailwind CSS",
      },
      {
        image:
          "data:image/png;base64,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",
        text: "Chakra UI",
      },
      {
        image: "/Skills_Imgs/Shad.png",
        text: "Shadcn UI",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmD38KsMgEwahtWc_Nfs5ZVktP9dBc36MUZA&s",
        text: "Flask",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCpCB6Du8H6Lrm5WIbDcdW59uqoSiL-eeTlw&s",
        text: "Pandas",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRC2C9EVtvZjW_wQ3f9bEP2Fgla230C3kVYQ&s",
        text: "NumPy",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg",
        text: "Vite",
      },

      {
        image: "/Skills_Imgs/MongoDb.png",
        text: "MongoDB",
      },
      {
        image: "/Skills_Imgs/Rest.jpg",
        text: "REST API",
      },
      {
        image: "/Skills_Imgs/GitHub.jpg",
        text: "GitHub Actions",
      },
      {
        image: "/Skills_Imgs/Figma1.webp",
        text: "Figma",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-TB9d5YXwtKhv4NWbpeTBVveYvcxu9gMJng&s",
        text: "Postman",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6UpksmxU6TG_194g1R-Gcb2HoA-kTbYqqZQ&s",
        text: "Canva",
      },
      {
        image:
          "data:image/png;base64,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",
        text: "ChatGPT",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPrK-y05cfo5GM1Pg55QJLLirq54AByCaozg&s",
        text: "Excel",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTddmx2R4_lkSt4x6MD2I0HgNXKhBmq8LvRAA&s",
        text: "PowerPoint",
      },
    ];

    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      });
    });
  }
  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }
  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * 0.05;
    this.scroll.target = this.scroll.position + distance;
  }
  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }
  onWheel() {
    this.scroll.target += 2;
    this.onCheckDebounce();
  }
  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      );
    }
  }
  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("mousewheel", this.boundOnWheel);
    window.addEventListener("wheel", this.boundOnWheel);
    window.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchstart", this.boundOnTouchDown);
    window.addEventListener("touchmove", this.boundOnTouchMove);
    window.addEventListener("touchend", this.boundOnTouchUp);
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    window.removeEventListener("mousewheel", this.boundOnWheel);
    window.removeEventListener("wheel", this.boundOnWheel);
    window.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);
    if (
      this.renderer &&
      this.renderer.gl &&
      this.renderer.gl.canvas.parentNode
    ) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 60px DM Sans",
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
    });
    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font]);
  return <div className="circular-gallery" ref={containerRef} />;
}
