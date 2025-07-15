// components/Loader.jsx
const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
