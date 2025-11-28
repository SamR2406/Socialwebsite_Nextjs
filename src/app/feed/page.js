import { posts } from "../messages";

export default function BlogFeed() {
  return (
    <div className="container mx-auto px-4 py-8 bg-slate-100">
      {/* Grid with 3 columns on large screens, 2 on medium, 1 on small */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              <em>{post.date}</em>
            </p>
            <p className="text-gray-700 leading-relaxed">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
