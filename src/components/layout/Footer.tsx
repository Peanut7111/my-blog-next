export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-green-700 to-green-600 border-t-4 border-green-800 py-6 mt-auto">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <p className="flex items-center justify-center gap-2">
          <span>💚</span>
          <span>Peanut的冒险日志</span>
          <span>·</span>
          <span>{new Date().getFullYear()}</span>
        </p>
        <p className="text-sm text-white/70 mt-2">
          每页都有4个呀哈哈！找到它们吧！
        </p>
      </div>
    </footer>
  );
}
