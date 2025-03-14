import os from 'os'
import fs from 'fs'
import path from 'path'

const isWindows = os.platform() === 'win32'

const huskyDir = path.join('.husky')
if (!fs.existsSync(huskyDir)) {
  fs.mkdirSync(huskyDir)
}

// Husky가 사용하는 기본 스크립트 포함
const huskyScript = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
`

const preCommitContent = isWindows
  ? `${huskyScript}\npnpm run lint-staged\n`
  : `${huskyScript}\nexport PATH="$HOME/.local/share/pnpm:/usr/local/bin:$PATH"\npnpm run lint-staged\n`

const prePushContent = isWindows
  ? `${huskyScript}\npnpm run build\n`
  : `${huskyScript}\nexport PATH="$HOME/.local/share/pnpm:/usr/local/bin:$PATH"\npnpm run build\n`

fs.writeFileSync(path.join(huskyDir, 'pre-commit'), preCommitContent)
fs.chmodSync(path.join(huskyDir, 'pre-commit'), '755')

fs.writeFileSync(path.join(huskyDir, 'pre-push'), prePushContent)
fs.chmodSync(path.join(huskyDir, 'pre-push'), '755')
