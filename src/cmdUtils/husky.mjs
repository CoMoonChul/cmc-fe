/**
 * husky 설정
 * 윈도우와 윈도우가 아닌 플랫폼에서 pre-commit을 실행하는 방식이 다르기 때문에
 */
import os from 'os';
import fs from 'fs';
import path from 'path';

// 윈도우인지 아닌지 체크
const isWindows = os.platform() === 'win32';

// .husky 디렉터리 존재 여부 확인 및 생성
const huskyDir = path.join('.husky');
if (!fs.existsSync(huskyDir)) {
  fs.mkdirSync(huskyDir);
}

const preCommitContent = `#!/bin/sh\n. "$(dirname "$0")/_/husky.sh"\npnpm lint-staged\n`

const prePushContent = isWindows ?
`nvm use 22.14.0\n
pnpm run build` :
`# macOS/Linux\n
export NVM_DIR="$HOME/.nvm"\n
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"\n
nvm use 22.14.0\n
pnpm run build`



// pre-commit 파일 작성
fs.writeFileSync(path.join(huskyDir, 'pre-commit'), preCommitContent);

fs.chmodSync(path.join(huskyDir, 'pre-commit'), '755');
// 권한 설정 (Windows에서는 chmod는 무시될 수 있음)

fs.writeFileSync(path.join(huskyDir, 'pre-push'), prePushContent);
fs.chmodSync(path.join(huskyDir, 'pre-push'), '755');
