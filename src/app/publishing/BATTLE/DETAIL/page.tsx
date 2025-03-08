import BattleCodeBlock from '../COMPONENT/BattleCodeBlock'

const sampleJavaScriptCode = `
// JavaScript Example Code
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function printFibonacci() {
  for (let i = 0; i < 20; i++) {
    console.log(\`Fibonacci(\${i}) = \${fibonacci(i)}\`);
  }
}

printFibonacci();
`.repeat(10)

const BattleDetailPage = () => {
  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">배틀 제목</h1>

      <div className="flex items-center justify-between space-x-4 mb-4">
        <div>
          <p className="text-sm font-medium">홍길동</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">2시간 전</p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          조회수: 120회
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <BattleCodeBlock
          code={sampleJavaScriptCode}
          isVoted={true}
          editable={false}
        />
        <div className="text-center text-lg font-bold min-w-max px-2 whitespace-nowrap">
          VS
        </div>
        <BattleCodeBlock
          code={sampleJavaScriptCode}
          isVoted={false}
          editable={true}
        />
      </div>

      <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
        코드를 클릭해 투표하세요
      </div>

      <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300">
          이 배틀의 설명이 여기에 들어갑니다. 코드 비교 배틀에 대한 설명을
          작성할 수 있습니다.
        </p>
      </div>
    </div>
  )
}

export default BattleDetailPage
