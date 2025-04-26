#  코문철 Co Moon Chul

> **코드 리뷰를 위한 개발자 커뮤니티 서비스**
> <br>
> 코드 리뷰 커뮤니티
> <br>
> 실시간 코드 공유
> <br>
> AI 코드 리뷰
>
> 프로젝트 기간 : 2025.02.01 ~ 2025.04.30

<br>

## Contributors

| 리더 | 배포/아키 | 알림/SMTP | 실시간 공유 | 리뷰/배틀 | 회원 |
| :---------: | :----------: | :---------: | :---------: | :---------: | :---------: |
| ⚡ 임현우 | ⚡ 심우현 | ⚡ 안승기 | ⚡ 고영성 | ⚡ 박종일 | ⚡ 한성수 |
| [Myunwoo](https://github.com/Myunwoo) | [woohj0702](https://github.com/woohj0702) | [AnSeungGi](https://github.com/AnSeungKi) | [KoYoungSung](https://github.com/KoYoungSung) | [Allday Park](https://github.com/JongIlParks) | [sungsuhan](https://github.com/sungsuhan) |

<br>

## 링크


- 배포 후 입력(서비스)

<br>

## Development Environment and Library

<p align="left"> <img src="https://img.shields.io/badge/Next.js-15.1.7-black"> <img src="https://img.shields.io/badge/React-19.0.0-blue"> <img src="https://img.shields.io/badge/TypeScript-5-blue"> <img src="https://img.shields.io/badge/TailwindCSS-3.4.1-teal"> <img src="https://img.shields.io/badge/TanStack%20Query-5.66.9-yellowgreen"> </p>

- Framework

|                라이브러리                |        사용 목적         | Version |
|:-----------------------------------:|:--------------------:|:-------:|
|    Next.js     |   React 기반 웹 프레임워크    |  15.1.7  |
|    React     |       UI 라이브러리        |  19.0.0  |
|       TailwindCSS       |      CSS 프레임워크       |  3.4.1  |
|      Zustand       |        글로벌 상태 관리        |  5.0.3  |
|    TanStack Query    |        서버 상태 관리        |  5.66.9  |

- Library

라이브러리 | 사용 목적 | Version  
:---------:|:---------:|:--------:  
openapi-generator | OpenAPI 코드 생성기 | 2.6.0
Framer Motion | 애니메이션 라이브러리 | 12.4.7  
CodeMirror | 코드 에디터 | 6.x
Diff Match Patch | 텍스트 비교 | 1.0.5
Pako | 데이터 압축 | 2.1.0

<br>

## Conventions

<details>
<summary>Commit Convention</summary>
<div markdown="1">

- [HOTFIX] : 🚑️  issue나, QA에서 급한 버그 수정에 사용
- [FIX] : 🔨 버그, 오류 해결
- [ADD] : ➕ Feat 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 시
- [FEAT] ✨ 새로운 기능 구현
- [DEL] : ⚰️ 쓸모없는 코드 삭제
- [DOCS] : 📝 README나 WIKI 등의 문서 개정
- [MOD] :💄 storyboard 파일,UI 수정한 경우
- [CHORE] : ✅ 코드 수정, 내부 파일 수정
- [CORRECT] : ✏️ 주로 문법의 오류나 타입의 변경, 이름 변경 등에 사용합니다.
- [MOVE] : 🚚 프로젝트 내 파일이나 코드의 이동
- [RENAME] : ⏪️  파일 이름 변경이 있을 때 사용합니다.
- [IMPROVE] : ⚡️ 향상이 있을 때 사용합니다.
- [REFACTOR] : ♻️ 전면 수정이 있을 때 사용합니다
- [MERGE] : 🔀 다른브렌치를 merge 할 때 사용합니다.
</div>
</details>

<details>
<summary>Git flow</summary>
<div markdown="1">

- Github issue에서 이슈가 발행되면 issue 별로 번호가 채번됩니다.
- 브랜치 명은 feature/{issue번호}로 생성합니다.

</div>
</details>

<details>
<summary>Feature Sliced Design</summary>
<div markdown="1">

# Layers

![1](https://github.com/user-attachments/assets/631d298b-9769-49cb-9dc5-a1d662cd0ab8)


Layers는 FSD 패턴의 첫 번째 수준을 나타냅니다. 레이어는 각각이 다루어야 할 책임과 다른 모듈과의 의존도에 따라 분류됩니다.

각 Layer는 Slice와 Segment들로 세분화되며, app과 shared 레이어는 그 자체로서 Slice이기 때문에 예외입니다.

<aside>
💡

레이어 폴더는 소문자로 명명합니다.

</aside>

![2](https://github.com/user-attachments/assets/015291eb-82db-443f-828d-7fc1d8c903c0)


상위 레벨에 있는 레이어는 하위 레벨을 의존성으로 가질 수 있지만 그 반대는 성립될 수 없습니다.

하위 레이어일수록 추상화가 심화되며(특정 상황에 국한되지 않는 범용성 높은 작업만을 포함), 상위 레이어일수록 비즈니스 로직이 심화됩니다.

<aside>
💡

레이어에 대한 가져오기 규칙

레이어는 매우 응집력 있는 모듈 그룹인 *슬라이스로* 구성되어 있습니다.

슬라이스의 모듈(파일)은 아래 레이어에 위치하는 것들만 의존성으로 가질 수 있습니다.

> For example, the folder `📁 ~/features/aaa` is a slice with the name "aaa". A file inside of it, `~/features/aaa/api/request.ts`, cannot import code from any file in `📁 ~/features/bbb`, but can import code from `📁 ~/entities` and `📁 ~/shared`, as well as any sibling code from `📁 ~/features/aaa`, for example, `~/features/aaa/lib/cache.ts`.
> 
</aside>

이제 하위 레이어에서부터 각각을 알아보겠습니다.

### Shared


<aside>
💡

Shared는 다른 모든 레이어의 근간을 형성하며, Slice를 두지 않고 Segment가 바로 하위에 존재합니다.

</aside>

다른 모든 레이어의 근간을 형성

일반적으로 Shared가 포함하는 세그먼트는 다음과 같습니다.

- `📁 api` : API 클라이언트이며 특정 백엔드 엔드포인트에 요청을 하는 기능을 포함할 수 있습니다.
- `📁 ui` : 애플리케이션의 ui Kit을 포함합니다. 비즈니스 로직을 포함하는 코드는 존재해선 안되며, 비즈니스 기반으로 분류하는 것은 괜찮습니다. Atomic Design 기준 Atoms 컴포넌트가 포함될 수 있습니다.
- `📁 lib` : 내부 라이브러리 모음. 이 세그먼트를 helper나 utilities 같은 뭉둥그려진 구조로 사용해서는 안되며, 날짜나 색상 같은 특정한 목적별로 관리되어야 합니다.
- `📁 config` : 환경 변수 등 전역 configuration이 포함됩니다.
- `📁 routes` : 라우팅 관련 constants나 pattern 등을 포함할 수 있습니다.
- `📁 store` : 프로젝트 전반에 걸쳐 사용할 Zustand store를 포함할 수 있습니다.

## Entities


<aside>
💡

엔터티 레이어에 포함되는 슬라이스는 실제 다루고자 하는 이 세상의 개념을 포함합니다.

코문철 기준으로, 리뷰/배틀/댓글 등 도메인이 해당됩니다.

</aside>

각 슬라이스에는 아래 세그먼트들이 포함됩니다.

| 파일 | 역할 |
| --- | --- |
| `types.ts` | 타입 정의 (인터페이스, enum 등) |
| `model.ts` | 데이터 변환 및 비즈니스 로직 |
| `api.ts` | API 호출 관련 함수 |

### types.ts

open api generator를 사용하지 않는 경우, api in/out 타입을 types.ts에 작성해야 합니다. 하지만 api in/out 스펙은 자동 생성되므로

- **프론트엔드에서 추가로 사용할 비즈니스 로직 관련 타입**
- **API 데이터를 가공한 후 상태 관리에 사용할 타입**

등이 있다면 이곳에 작성합니다.

<aside>
💡

중요! oag로 자동 생성된 api in/out dto interface는 entites/domain/types.ts에 작성한 것으로 간주합니다.

</aside>

### model.ts

**이 파일은 실제 데이터를 다루는 로직을 포함합니다.**

주요 역할은:

- API 데이터와 내부 데이터 모델을 변환 (`types.ts`에서 정의한 타입 사용)
- 도메인 로직 포함 (예: 데이터 변환, 기본값 설정 등)

### api.ts

이 파일은 엔터티와 관련된 API를 호출하는 함수를 포함합니다.

코문철에서는 open api generator로 자동 생성된 스펙을 호출하면서

- basePath 설정
- api 호출 시 공통 apiClient를 경유하도록 설정
- output 형식 정제

위 세가지 설정을 추가합니다.

## Features


Features 레이어가 Entities, Shared와 어떻게 다른지 표로 나타내었습니다.

| 폴더 | 역할 |
| --- | --- |
| **`entities/`** | **도메인 모델** (User, Comment, Battle 등 핵심 개념) |
| **`feature/`** | **도메인 단위의 비즈니스 로직과 UI** (BattlePage, UserProfile 등) |
| **`shared/`** | **전역적으로 사용되는 공통 모듈** (UI, Utils, API 클라이언트 등) |

이 레이어는 앱의 주요 상호 작용을 포함합니다. 각 도메인에서 다루어야 할 기능을 담지만, “모든 것을 기능으로 세분화”하는 상황을 경계하면 되겠습니다.

코문철의  Feature layer는 Entities layer와 동일하게 도메인 별 Slice를 갖도록 하고, 아래 Segment 들을 갖도록 하겠습니다.

| 파일 | 역할 |
| --- | --- |
| `model/` | 상태 관리 (Zustand) |
| `ui/` | ui 컴포넌트 |
| `hooks/` | React Hooks |
| `types.ts` | 타입 정의 |
| `helper.ts` | 유틸리티 함수 |
| `constants.ts` | 상수 정의 |

## Widgets


<aside>
⛔

위젯 레이어는 독립적인 UI 블록을 대규모로 관리할 수 있는 레이어이지만, 코문철에서는 사용하지 않도록 하겠습니다.

</aside>

## Pages, App


<aside>
⛔

Next.js에서 app 폴더 하위에 파일 구조 기반 라우팅이 자동 처리되므로, App 디렉토리 하위에 작성되는 모든 내용은 Pages Layer로 간주하겠습니다.

</aside>

</div>
</details>

<details>
<summary>
Tanstack query
</summary>
<div markdown="1">

## Tanstack Query의 선언

---

```jsx
import { useQuery } from '@tanstack/react-query'
import { selectBattle } from '@/entities/battle/api'
import { BATTLE } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * battleId에 해당하는 배틀 상세 정보를 불러오는 Query
 * @param battleId 배틀 id
 * @returns API 응답 데이터
 */
export const useBattleDetailQuery = (battleId: number) => {
  return useQuery<BATTLE.SelectBattleResDTO>({
    queryKey: [QUERY_KEYS.BATTLE.DETAIL, battleId],
    queryFn: () => selectBattle(battleId),
  })
}
```

- Tanstack query는 hook으로 감싸 사용
- hook의 이름은 조회성 쿼리는 Query, 처리성 쿼리는 Mutation을 붙여서 사용

<img width="269" alt="스크린샷 2025-04-26 오후 5 35 08" src="https://github.com/user-attachments/assets/725a4f0c-ff65-491b-a96b-f652fd148aaf" />

- 쿼리 키는 feature/{domain}/types.ts에 아래 코드와 같이 QUERY_KEY를 export하여 공통적으로 사용할 수 있도록 함

```jsx
export const QUERY_KEYS = {
  BATTLE: {
    DETAIL: "battle.Detail",
  },
};
```

</div>
</details>

<br>


## AWS Architecture
![cmc drawio](https://github.com/user-attachments/assets/b3f5cc1b-0d7b-4fab-adda-75828f9f8ef7)



