import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-[var(--color-primary-500)] mb-4">
        Hello Sophia!
      </h1>
      <p className="text-lg text-[var(--color-base-900)] mb-6">
        Let's learn some english!
      </p>
      <p className="text-lg text-[var(--color-base-900)] mb-6 pl-2">
        让我们学习英语吧！
      </p>
      <Link
        to="/picture-recognition"
        className="inline-block px-4 py-2 bg-[var(--color-primary-500)] text-white rounded hover:bg-[var(--color-primary-600)] transition-colors"
      >
        Picture Recognition
      </Link>
    </div>
  );
}

export default Home;
