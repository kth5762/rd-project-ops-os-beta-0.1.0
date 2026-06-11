import { Component, useEffect, useMemo, useRef, useState } from 'react';
import {
  Archive,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Download,
  FilePlus2,
  FileText,
  FlaskConical,
  FolderKanban,
  Gauge,
  Landmark,
  Layers3,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Upload,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from 'lucide-react';
import './styles.css';

const navItems = [
  { id: 'console', label: '통합 콘솔', icon: Gauge },
  { id: 'portfolio', label: '과제 포트폴리오', icon: FolderKanban },
  { id: 'execution', label: '과제 수행', icon: ClipboardList },
  { id: 'support', label: '지원사업/공고', icon: BriefcaseBusiness },
  { id: 'ip', label: '특허/IP', icon: ShieldCheck },
  { id: 'test', label: '시험·분석 의뢰', icon: FlaskConical },
  { id: 'budget', label: '예산·장비', icon: WalletCards },
  { id: 'outcome', label: '성과·기술료', icon: BarChart3 },
  { id: 'labadmin', label: '연구소 행정', icon: Building2 },
  { id: 'assets', label: '자료 제작', icon: FileText },
  { id: 'chatgpt', label: 'ChatGPT 업무지원', icon: MessageSquareText },
  { id: 'team', label: '팀 업무 입력', icon: UsersRound },
];

const quickLinks = [
  { label: '주간 업무보고', icon: ClipboardCheck, action: 'report' },
  { label: '특허 마감 관리', icon: ShieldCheck, action: 'ip' },
  { label: '시험의뢰 현황', icon: FlaskConical, action: 'test' },
  { label: '예산 집행 현황', icon: WalletCards, action: 'budget' },
];

const dateRanges = ['2026-06-08 ~ 2026-07-05', '2026-06-15 ~ 2026-07-12', '2026-07-01 ~ 2026-07-31'];

const weekDays = [
  { date: '2026-06-08', label: '월', short: '06.08' },
  { date: '2026-06-09', label: '화', short: '06.09' },
  { date: '2026-06-10', label: '수', short: '06.10' },
  { date: '2026-06-11', label: '목', short: '06.11' },
  { date: '2026-06-12', label: '금', short: '06.12' },
  { date: '2026-06-13', label: '토', short: '06.13' },
  { date: '2026-06-14', label: '일', short: '06.14' },
];

const initialWorkItems = [
  {
    id: 'REQ-2026-061',
    type: '연구개발과제',
    project: '차세대 고효율 모터 개발',
    task: '연차별 상세계획 수립',
    owner: '김태현 과장',
    coOwner: '박지수 대리',
    stage: '계획',
    due: '2026-06-12',
    evidence: ['계획서(안)', '추진일정표'],
    evidenceNeed: '계획서 보완',
    institution: '한국에너지공단',
    risk: '중',
    status: '보완 필요',
    lastUpdate: '06-08',
    memo: '과제 목표, 세부 연구내용, 연차별 추진계획, 예산계획 포함',
    blocker: '전년도 결과 반영 데이터 일부 미확보',
    nextAction: '6/10 내부 확인 후 보완',
    export: 'DOCX',
  },
  {
    id: 'REQ-2026-060',
    type: '연구개발과제',
    project: '차세대 고효율 모터 개발',
    task: '주간 현황 점검',
    owner: '이주형 대리',
    coOwner: '김태현 과장',
    stage: '수행',
    due: '2026-06-09',
    evidence: ['진도보고서'],
    evidenceNeed: '성과 근거',
    institution: '-',
    risk: '낮음',
    status: '진행 중',
    lastUpdate: '06-08',
    memo: '참여기관별 진도와 요청사항 취합',
    blocker: '위탁기관 시험 일정 확정 필요',
    nextAction: '참여기관 의견 회신 취합',
    export: 'XLSX',
  },
  {
    id: 'REQ-2026-059',
    type: '지원사업',
    project: '산업기술혁신사업',
    task: '신청서 및 사업계획서 작성',
    owner: '박지수 대리',
    coOwner: '이민주 대리',
    stage: '작성',
    due: '2026-06-15',
    evidence: ['공고문', '사업계획서 초안'],
    evidenceNeed: '재무 증빙',
    institution: '산업통상자원부',
    risk: '높음',
    status: '작성',
    lastUpdate: '06-07',
    memo: '지원 요건 확인과 참여기관 확약서 수합 필요',
    blocker: '공급업체 견적서 수신 대기',
    nextAction: '관리팀 요청자료 취합',
    export: 'PDF',
  },
  {
    id: 'REQ-2026-058',
    type: '특허/IP',
    project: '모터 제어 알고리즘',
    task: '특허 출원 초안 작성',
    owner: '이민주 대리',
    coOwner: '김태현 과장',
    stage: '작성',
    due: '2026-06-20',
    evidence: ['명세서 초안', '선행기술 메모'],
    evidenceNeed: '실험 데이터',
    institution: '특허법인 OO',
    risk: '중',
    status: '보완 필요',
    lastUpdate: '06-08',
    memo: '청구항 범위와 회피 설계 포인트 확인 필요',
    blocker: '성능 비교 실험표 보완 필요',
    nextAction: '발명자 인터뷰 일정 확정',
    export: 'DOCX',
  },
  {
    id: 'REQ-2026-057',
    type: '시험·분석 의뢰',
    project: '차세대 고효율 모터 개발',
    task: '효율/온도 특성 시험 의뢰',
    owner: '이주형 대리',
    coOwner: '박지수 대리',
    stage: '의뢰',
    due: '2026-06-11',
    evidence: ['시험의뢰서'],
    evidenceNeed: '조건 합의',
    institution: 'KCL',
    risk: '중',
    status: '외부 협의',
    lastUpdate: '06-08',
    memo: '시험 조건, 샘플 수량, 결과서 양식 협의 중',
    blocker: '시험기관 일정 회신 대기',
    nextAction: '조건표 재송부',
    export: 'XLSX',
  },
  {
    id: 'REQ-2026-056',
    type: '예산·장비',
    project: '공동연구장비',
    task: '사업서/견적서/사용계획서 검토',
    owner: '김태현 과장',
    coOwner: '박지수 대리',
    stage: '확인',
    due: '2026-06-13',
    evidence: ['견적서', '사양서', '활용계획서'],
    evidenceNeed: '비교견적',
    institution: 'OO기기(주)',
    risk: '낮음',
    status: '진행 중',
    lastUpdate: '06-08',
    memo: '고가 장비 도입 관련 규격, 활용 계획, 설치 일정 조율',
    blocker: '설치 공간 확인 필요',
    nextAction: '연구소 시설 담당자 확인',
    export: 'DOCX',
  },
  {
    id: 'REQ-2026-055',
    type: '성과·기술료',
    project: '기술이전 A사',
    task: '기술료 정산(분기)',
    owner: '박지수 대리',
    coOwner: '김태현 과장',
    stage: '정산',
    due: '2026-06-25',
    evidence: ['정산서', '매출액 산출표'],
    evidenceNeed: '매출 확인',
    institution: 'A사',
    risk: '낮음',
    status: '마감 대기',
    lastUpdate: '06-06',
    memo: '기술료 대상 제품 분류 및 매출액 산출 보조',
    blocker: 'A사 매출 증빙 최종본 대기',
    nextAction: '경상기술료 납부 일정 등록',
    export: 'XLSX',
  },
  {
    id: 'REQ-2026-054',
    type: '연구소 행정',
    project: '법정 의무',
    task: '연구개발활동 조사',
    owner: '이민주 대리',
    coOwner: '이주형 대리',
    stage: '진행',
    due: '2026-06-10',
    evidence: ['조사표'],
    evidenceNeed: '인력현황',
    institution: 'KOITA',
    risk: '높음',
    status: '진행 중',
    lastUpdate: '06-07',
    memo: '기업부설연구소 인력, 시설, 자산 현황 정리',
    blocker: '안양연구소 자산 업데이트 미완료',
    nextAction: '자산 목록 재확인',
    export: 'PDF',
  },
  {
    id: 'REQ-2026-053',
    type: '자료 제작',
    project: 'IR 자료',
    task: '투자자 대상 IR 자료 업데이트',
    owner: '김태현 과장',
    coOwner: '이민주 대리',
    stage: '작성',
    due: '2026-06-18',
    evidence: ['IR Deck', 'IP 현황표'],
    evidenceNeed: '시장 자료',
    institution: '-',
    risk: '중',
    status: '작성',
    lastUpdate: '06-08',
    memo: 'VC, 투자사 대상 기술/IP/성과 자료 보완',
    blocker: '최근 매출성과 수치 확정 필요',
    nextAction: '성과표 수치 업데이트',
    export: 'PPTX',
  },
  {
    id: 'REQ-2026-052',
    type: '연구개발과제',
    project: '신규 과제 발굴',
    task: '과제 신청 공고 모니터링 및 사전 검토자료 준비',
    owner: '김태현 과장',
    coOwner: '박지수 대리',
    stage: '계획',
    due: '2026-06-17',
    evidence: ['공고 모니터링표', '참여 적합성 검토표'],
    evidenceNeed: '사전 검토자료',
    institution: 'NTIS/전문기관',
    risk: '중',
    status: '진행 중',
    lastUpdate: '06-08',
    memo: '정부과제 신청 공고 모니터링, 참여 가능성 검토, 연구계획서/발표자료 준비 범위를 정리',
    blocker: '참여기관 역할 범위 확인 필요',
    nextAction: '후보 공고별 적합성 점수 정리',
    export: 'XLSX',
  },
  {
    id: 'REQ-2026-051',
    type: '연구개발과제',
    project: '협약/전산등록',
    task: '선정 과제 협약 진행 및 전산등록 체크리스트',
    owner: '박지수 대리',
    coOwner: '김태현 과장',
    stage: '계획',
    due: '2026-06-19',
    evidence: ['협약 체크리스트'],
    evidenceNeed: '전산등록 증빙',
    institution: '전문기관 PMS',
    risk: '중',
    status: '계획',
    lastUpdate: '06-08',
    memo: '선정 과제의 계획서 보완, 협약 서류, 전산등록, 참여기관 역할 입력을 준비',
    blocker: '-',
    nextAction: '전산등록 필수 항목과 담당자 매핑',
    export: 'XLSX',
  },
  {
    id: 'REQ-2026-050',
    type: '성과·기술료',
    project: '종료과제 사후관리',
    task: '기술보고서/종료보고서 초안 및 결과물 정리',
    owner: '김태현 과장',
    coOwner: '이주형 대리',
    stage: '작성',
    due: '2026-06-30',
    evidence: ['결과물 목록', '기술보고서 목차'],
    evidenceNeed: '종료보고서 초안',
    institution: '전문기관',
    risk: '중',
    status: '작성',
    lastUpdate: '06-08',
    memo: '과제 종료 시 기술보고서/종료보고서 초안 작성, 결과물 정리, 외부 대응용 기술자료 구성',
    blocker: '성과 실적 수치 확정 필요',
    nextAction: '결과물별 증빙 파일 연결',
    export: 'DOCX',
  },
  {
    id: 'REQ-2026-049',
    type: '특허/IP',
    project: 'IP 포트폴리오',
    task: '특허 포트폴리오 및 권리보장 전략 점검',
    owner: '이민주 대리',
    coOwner: '김태현 과장',
    stage: '확인',
    due: '2026-06-24',
    evidence: ['IP 현황표'],
    evidenceNeed: '권리범위 매핑',
    institution: '특허법인 OO',
    risk: '중',
    status: '진행 중',
    lastUpdate: '06-08',
    memo: '국내외 지식재산권 출원/OA/등록/연차료와 보유 기술 권리보장 전략을 함께 점검',
    blocker: '해외 출원 유지비 확인 필요',
    nextAction: '보유 기술별 권리범위와 공백 영역 정리',
    export: 'XLSX',
  },
  {
    id: 'REQ-2026-048',
    type: '연구소 행정',
    project: '법정 의무',
    task: '정밀안전진단·작업환경측정·건강검진 일정 점검',
    owner: '이민주 대리',
    coOwner: '박지수 대리',
    stage: '계획',
    due: '2026-06-28',
    evidence: ['법정의무 캘린더'],
    evidenceNeed: '대상자/점검표',
    institution: '안전진단기관',
    risk: '중',
    status: '계획',
    lastUpdate: '06-08',
    memo: '정밀안전진단, 작업환경측정, 건강검진 등 주기적 법정 의무사항 대응 일정 관리',
    blocker: '-',
    nextAction: '대상 인력과 진단기관 일정 확인',
    export: 'PDF',
  },
  {
    id: 'REQ-2026-047',
    type: '자료 제작',
    project: '성과 교류회',
    task: '킥오프 미팅/성과 교류회 자료 및 행사 운영 지원',
    owner: '김태현 과장',
    coOwner: '이민주 대리',
    stage: '작성',
    due: '2026-06-21',
    evidence: ['행사 아젠다', '발표자료 목차'],
    evidenceNeed: '참여기관 요청사항',
    institution: '공동/위탁개발기관',
    risk: '낮음',
    status: '작성',
    lastUpdate: '06-08',
    memo: '킥오프 미팅, 성과 교류회 참석 및 행사 기획, 실무 지원, 참여기관 요청사항 대응',
    blocker: '참여기관 발표 순서 확정 필요',
    nextAction: '기관별 발표자료 제출 일정 공지',
    export: 'PPTX',
  },
];

const initialExternalRequests = [
  {
    id: 'EXT-104',
    project: '차세대 고효율 모터 개발',
    institution: 'KCL',
    request: '효율/온도 특성 시험 조건 회신',
    owner: '이주형 대리',
    due: '2026-06-11',
    status: '회신 대기',
    channel: '이메일',
    lastMemo: '시험 샘플 수량과 온도 조건표 재송부 필요',
  },
  {
    id: 'EXT-103',
    project: '산업기술혁신사업',
    institution: '산업통상자원부',
    request: '지원 요건 및 제출 증빙 확인',
    owner: '박지수 대리',
    due: '2026-06-13',
    status: '자료 요청',
    channel: '전산/공문',
    lastMemo: '재무 증빙과 참여기관 확약서 항목 확인 중',
  },
  {
    id: 'EXT-102',
    project: '모터 제어 알고리즘',
    institution: '특허법인 OO',
    request: '명세서 초안 검토 의견',
    owner: '이민주 대리',
    due: '2026-06-14',
    status: '진행 중',
    channel: '이메일',
    lastMemo: '청구항 범위와 실험표 보완 의견 요청',
  },
  {
    id: 'EXT-101',
    project: '공동연구장비',
    institution: 'OO기기(주)',
    request: '비교견적 및 설치 일정 확인',
    owner: '김태현 과장',
    due: '2026-06-12',
    status: '회신 완료',
    channel: '전화/메일',
    lastMemo: '설치 공간 확인 후 최종 견적서 발행 예정',
  },
  {
    id: 'EXT-100',
    project: '신규 과제 발굴',
    institution: 'NTIS/전문기관',
    request: '후보 공고 세부 요건 및 참여 제한 확인',
    owner: '김태현 과장',
    due: '2026-06-17',
    status: '자료 요청',
    channel: '공고/문의',
    lastMemo: '지원 분야, 매칭 비율, 참여기관 자격 요건 확인 필요',
  },
  {
    id: 'EXT-099',
    project: '협약/전산등록',
    institution: '전문기관 PMS',
    request: '협약 서류 및 전산등록 필수 항목 확인',
    owner: '박지수 대리',
    due: '2026-06-19',
    status: '진행 중',
    channel: '전산/공문',
    lastMemo: '참여기관 역할 입력, 계좌/사업비 항목 증빙 확인 중',
  },
  {
    id: 'EXT-098',
    project: '법정 의무',
    institution: '안전진단기관',
    request: '정밀안전진단·작업환경측정 가능 일정 확인',
    owner: '이민주 대리',
    due: '2026-06-21',
    status: '회신 대기',
    channel: '이메일',
    lastMemo: '대상 공간, 측정 항목, 건강검진 대상자 범위 회신 대기',
  },
  {
    id: 'EXT-097',
    project: '성과 교류회',
    institution: '공동/위탁개발기관',
    request: '킥오프·성과 교류회 발표자료 제출 일정 회신',
    owner: '김태현 과장',
    due: '2026-06-18',
    status: '자료 요청',
    channel: '이메일',
    lastMemo: '기관별 발표 순서와 자료 제출 마감 공지 필요',
  },
];

const initialTestInstitutions = [
  {
    id: 'TEST-001',
    seq: 1,
    institution: '한국소재융합연구원',
    testItem: 'BSP 원료 순도/열변형 평가',
    url: 'https://www.kims.re.kr',
    accountId: 'chemland-bsp',
    password: '입력 필요',
  },
  {
    id: 'TEST-002',
    seq: 2,
    institution: '한국세라믹기술원',
    testItem: '사파이어 분말 입도/형상 분석',
    url: 'https://www.kicet.re.kr',
    accountId: 'sapphire-powder',
    password: '입력 필요',
  },
  {
    id: 'TEST-003',
    seq: 3,
    institution: '인하대학교',
    testItem: '구상 실리카 비드 이미지/흡유량 분석',
    url: 'https://www.inha.ac.kr',
    accountId: 'silica-bead',
    password: '입력 필요',
  },
  {
    id: 'TEST-004',
    seq: 4,
    institution: '한국콜마',
    testItem: '색조 제형 적용성 평가',
    url: 'https://equipment.example.ac.kr',
    accountId: 'cosmetic-formula',
    password: '입력 필요',
  },
];

const initialPatentHoldings = [
  {
    id: 'IP-001',
    type: '국내 출원',
    title: '저열변형 화학 원료 조성 및 제조 방법',
    applicationNo: '10-2026-0061201',
    applicationDate: '2026-05-20',
    registrationNo: '-',
    registrationDate: '-',
    product: '백사이드 보호필름용 고순도 화학 원료',
    specification: 'BSP_저열변형_명세서초안.docx, 조성별 열변형 평가표',
    summary: 'BSP 보호필름 적용을 위한 고순도 원료 조성과 저열변형 제조 조건을 권리범위로 정리 중입니다.',
    history: ['2026-06-08 발명자 인터뷰 메모 반영', '2026-06-05 조성별 비교예 데이터 수합', '2026-05-20 국내 출원 접수'],
  },
  {
    id: 'IP-002',
    type: '국내 등록',
    title: '판상 사파이어 분말의 제조 방법',
    applicationNo: '10-2024-0048120',
    applicationDate: '2024-04-11',
    registrationNo: '10-2689123',
    registrationDate: '2026-03-14',
    product: '색조 화장품용 판상 사파이어 분말',
    specification: '등록원부, 입자형상 분석자료, 청구항 권리범위 매핑표',
    summary: '판상 입자 형상과 분말 제조 조건이 색조 제형 적용 제품에 충분히 연결되는지 점검합니다.',
    history: ['2026-06-03 적용 제형 매핑 업데이트', '2026-03-14 등록 결정', '2024-04-11 국내 출원'],
  },
  {
    id: 'IP-003',
    type: '해외 출원',
    title: 'Surface-treated spherical silica beads for cosmetic formulations',
    applicationNo: 'PCT/KR2026/001205',
    applicationDate: '2026-02-18',
    registrationNo: '-',
    registrationDate: '-',
    product: '화장품용 기능성 구상 실리카 비드',
    specification: 'PCT 명세서, 표면처리 후보군 실험표, 해외 출원 비용 검토표',
    summary: '구상 실리카 비드의 표면처리 조건과 제형 적용성을 중심으로 주요 진입국 후보를 검토합니다.',
    history: ['2026-06-07 해외 진입국 후보 정리', '2026-02-18 PCT 출원', '2026-01-25 번역 검토 완료'],
  },
  {
    id: 'IP-004',
    type: '해외 등록',
    title: 'High-purity inorganic powder dispersion method',
    applicationNo: 'US17/842901',
    applicationDate: '2022-06-20',
    registrationNo: 'US 12,041,890',
    registrationDate: '2025-11-03',
    product: '화장품용 무기 분말 분산 소재',
    specification: '미국 등록증, 분산 안정성 평가표, 연차료 납부 일정표',
    summary: '무기 분말 분산 안정성 관련 등록 청구항과 실제 제형 적용 범위를 정기 점검합니다.',
    history: ['2026-06-01 연차료 일정 캘린더 반영', '2025-11-03 미국 등록', '2022-06-20 미국 출원'],
  },
];

const budgetAmountKeys = [
  { key: 'equipment', label: '연구장비비' },
  { key: 'material', label: '연구재료비' },
  { key: 'activity', label: '연구활동비' },
  { key: 'labor', label: '인건비' },
  { key: 'allowance', label: '연구수당' },
  { key: 'overhead', label: '간접비' },
];

const initialBudgetRows = [
  {
    id: 'BUD-001',
    project: '차세대 고효율 모터 개발',
    year: '2026',
    equipment: 42000000,
    material: 18000000,
    activity: 12000000,
    labor: 96000000,
    allowance: 14000000,
    overhead: 21000000,
  },
  {
    id: 'BUD-002',
    project: '차세대 고효율 모터 개발',
    year: '2027',
    equipment: 28000000,
    material: 24000000,
    activity: 15000000,
    labor: 102000000,
    allowance: 16000000,
    overhead: 23000000,
  },
  {
    id: 'BUD-003',
    project: '산업기술혁신사업',
    year: '2026',
    equipment: 12000000,
    material: 9000000,
    activity: 11000000,
    labor: 52000000,
    allowance: 8000000,
    overhead: 9500000,
  },
  {
    id: 'BUD-004',
    project: '공동연구장비',
    year: '2026',
    equipment: 88000000,
    material: 6000000,
    activity: 5000000,
    labor: 22000000,
    allowance: 4000000,
    overhead: 12000000,
  },
  {
    id: 'BUD-005',
    project: '신규 과제 발굴',
    year: '2026',
    equipment: 5000000,
    material: 4000000,
    activity: 7000000,
    labor: 30000000,
    allowance: 3000000,
    overhead: 5000000,
  },
];

const evidenceVault = [
  { id: 'DOC-210', name: 'BSP_연차별_상세계획서_초안.pdf', type: '계획서', project: '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발', owner: '김태현 과장', status: '확인 필요', linked: 3 },
  { id: 'DOC-209', name: 'BSP_순도열변형_시험조건표.xlsx', type: '시험자료', project: '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발', owner: '이주형 대리', status: '외부 회신 대기', linked: 2 },
  { id: 'DOC-208', name: '저열변형원료_특허명세서_초안.docx', type: '특허', project: '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발', owner: '이민주 대리', status: '보완 필요', linked: 4 },
  { id: 'DOC-207', name: '스케일업팁스_사업계획서_초안.pptx', type: '지원사업', project: '화장품용 기능성 구상 실리카 비드의 합성과 그 응용 기술 개발', owner: '박지수 대리', status: '작성 중', linked: 5 },
  { id: 'DOC-206', name: 'IR_무기소재_IP성과현황.pptx', type: 'IR자료', project: 'IR 자료', owner: '김태현 과장', status: '업데이트 필요', linked: 2 },
  { id: 'DOC-205', name: '신규과제_화장품소재_적합성검토표.xlsx', type: '공고검토', project: '신규 과제 발굴', owner: '김태현 과장', status: '보완 필요', linked: 3 },
  { id: 'DOC-204', name: '협약전산등록_필수항목체크리스트.xlsx', type: '협약', project: '협약/전산등록', owner: '박지수 대리', status: '작성 중', linked: 2 },
  { id: 'DOC-203', name: '사파이어_입자형상_분석결과_초안.docx', type: '시험자료', project: '색조 화장품용 사파이어 단결정 분말 제조 및 응용 기술 개발', owner: '김태현 과장', status: '보완 필요', linked: 4 },
  { id: 'DOC-202', name: '무기소재_IP포트폴리오_권리범위매핑.xlsx', type: '특허', project: 'IP 포트폴리오', owner: '이민주 대리', status: '진행 중', linked: 3 },
  { id: 'DOC-201', name: '법정의무_안전보건_연간캘린더.pdf', type: '행정', project: '법정 의무', owner: '이민주 대리', status: '대상자 확인 필요', linked: 3 },
  { id: 'DOC-200', name: '성과교류회_아젠다_발표자료목차.pptx', type: '행사자료', project: '성과 교류회', owner: '김태현 과장', status: '작성 중', linked: 2 },
];

const projectGateProfiles = {
  '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발': [
    {
      gate: '연차 계획 제출',
      owner: '김태현 과장',
      due: '2026-06-12',
      readiness: 72,
      status: '보완 필요',
      required: ['연차별 상세계획서', '추진일정표', '예산계획'],
      missing: ['원료 순도 분석 근거'],
    },
    {
      gate: 'BSP 원료 평가 근거',
      owner: '이주형 대리',
      due: '2026-06-11',
      readiness: 64,
      status: '외부 협의',
      required: ['시험의뢰서', '열변형 조건표', '결과서 양식'],
      missing: ['한국소재융합연구원 일정 회신'],
    },
    {
      gate: '참여기관 주간점검',
      owner: '김태현 과장',
      due: '2026-06-14',
      readiness: 76,
      status: '진행 중',
      required: ['진도보고서', '회의록', '요청사항 목록'],
      missing: ['공동기관 산출물 회수 일정'],
    },
  ],
  '색조 화장품용 사파이어 단결정 분말 제조 및 응용 기술 개발': [
    {
      gate: '입자 형상 분석',
      owner: '박지수 대리',
      due: '2026-06-13',
      readiness: 58,
      status: '작성 중',
      required: ['SEM 이미지', '입도 분포표', '시료 목록'],
      missing: ['분석기관 일정 확정'],
    },
    {
      gate: '제형 적용성 협의',
      owner: '김태현 과장',
      due: '2026-07-19',
      readiness: 42,
      status: '보완 필요',
      required: ['평가항목표', '한국콜마 협의 메모', '시료 스펙'],
      missing: ['제형 평가 기준 최신화'],
    },
  ],
  '화장품용 기능성 구상 실리카 비드의 합성과 그 응용 기술 개발': [
    {
      gate: '사업계획 보완',
      owner: '이민주 대리',
      due: '2026-06-20',
      readiness: 55,
      status: '보완 필요',
      required: ['사업계획서', '시장성 근거', '공동기관 역할표'],
      missing: ['인하대학교 역할 범위 확인'],
    },
    {
      gate: '구상 실리카 시험 항목',
      owner: '김태현 과장',
      due: '2026-06-18',
      readiness: 48,
      status: '외부 협의',
      required: ['흡유량 조건표', '입자 이미지 기준', '제형 적용 항목'],
      missing: ['시험 항목 확정 회신'],
    },
  ],
  'IP 포트폴리오': [
    {
      gate: '저열변형 원료 특허',
      owner: '김태현 과장',
      due: '2026-06-13',
      readiness: 64,
      status: '진행 중',
      required: ['명세서 초안', '청구항', '조성별 실험근거'],
      missing: ['비교예 데이터 보완'],
    },
  ],
  '성과 교류회': [
    {
      gate: '성과 발표자료',
      owner: '박지수 대리',
      due: '2026-06-25',
      readiness: 88,
      status: '마감 대기',
      required: ['성과표', '시험 이미지', '특허 현황'],
      missing: ['사파이어 적용성 이미지'],
    },
  ],
  '법정 의무': [
    {
      gate: '연구개발활동 조사',
      owner: '이민주 대리',
      due: '2026-06-10',
      readiness: 34,
      status: '진행 중',
      required: ['조사표', '인력현황', '시설/자산 현황'],
      missing: ['안양연구소 자산 업데이트'],
    },
  ],
  'IR 자료': [
    {
      gate: '투자자 대응자료',
      owner: '김태현 과장',
      due: '2026-06-18',
      readiness: 52,
      status: '작성',
      required: ['IR Deck', 'IP 현황표', '성과표'],
      missing: ['최근 매출성과 수치'],
    },
  ],
};

const members = [
  {
    name: '김태현 과장',
    short: '김',
    role: '과제기획/총괄',
    color: 'blue',
    responsibilities: ['과제 기획', '대외 협력', 'IR/보고자료', '성과 관리'],
    focus: '진행 과제 우선순위와 의사결정 필요 항목 정리',
    defaultTypes: ['연구개발과제', '자료 제작', '성과·기술료'],
  },
  {
    name: '박지수 대리',
    short: '박',
    role: '지원사업/예산',
    color: 'green',
    responsibilities: ['지원사업 신청', '예산 증빙', '장비 서류', '사후 조사'],
    focus: '지원사업 제출자료와 예산/장비 증빙 수합',
    defaultTypes: ['지원사업', '예산·장비', '성과·기술료'],
  },
  {
    name: '이주형 대리',
    short: '이',
    role: '시험의뢰/수행관리',
    color: 'red',
    responsibilities: ['시험 의뢰', '정량목표 근거', '주간 현황', '외부 평가기관 협의'],
    focus: '시험기관 회신과 KPI 근거자료 연결',
    defaultTypes: ['시험·분석 의뢰', '연구개발과제'],
  },
  {
    name: '이민주 대리',
    short: '민',
    role: '특허/IP·자료',
    color: 'indigo',
    responsibilities: ['특허/IP', '명세서 검토', '자료 제작', '연구소 행정'],
    focus: '특허 기한과 보완자료, 행정 제출 일정 관리',
    defaultTypes: ['특허/IP', '자료 제작', '연구소 행정'],
  },
];

const workloadModuleOrder = ['execution', 'support', 'ip', 'test', 'budget', 'outcome', 'labadmin', 'assets'];

const workloadModuleSpecs = {
  execution: {
    title: '과제 수행 세부 업무량 현황',
    subtitle: '등록된 과제 수행 업무를 세부 범주별로 집계합니다. 주담당 1건, 공동담당 0.5건 기준입니다.',
    consoleLabel: '과제 수행',
    types: ['연구개발과제'],
    columns: [
      { label: '원료·합성', keywords: ['원료', '합성', '분말', '제조', '정제'] },
      { label: '분석·평가', keywords: ['분석', '평가', 'KPI', '근거', '시험'] },
      { label: '보고·협업', keywords: ['보고', '협업', '산출물', '회의', '정리'] },
      { label: '제형 적용', keywords: ['제형', '적용', '한국콜마', '사용감'] },
      { label: '외부 협의', keywords: ['기관', '협의', '회신', '공동', '위탁'] },
      { label: '기타', keywords: [] },
    ],
  },
  support: {
    title: '지원사업 세부 업무량 현황',
    subtitle: '공고 검토부터 신청·협약·사후관리까지 담당자별 집중 영역을 보여줍니다.',
    consoleLabel: '지원사업',
    types: ['지원사업'],
    columns: [
      { label: '공고 검토', keywords: ['공고', '적합성', '요건'] },
      { label: '사업계획', keywords: ['사업계획', '신청서', '기술성', '시장성'] },
      { label: '증빙 수합', keywords: ['증빙', '견적', '자료', '근거'] },
      { label: '제출·협약', keywords: ['제출', '협약', '전산', '등록'] },
      { label: '사후관리', keywords: ['사후', '조사', '성과', '관리'] },
      { label: '기타', keywords: [] },
    ],
  },
  ip: {
    title: '특허/IP 세부 업무량 현황',
    subtitle: 'IP 전략, 명세서, 출원 대응 등 특허 관련 실무 집중도를 계산합니다.',
    consoleLabel: '특허',
    types: ['특허/IP'],
    columns: [
      { label: 'IP 전략', keywords: ['IP', '전략', '권리화', '포트폴리오'] },
      { label: '선행기술', keywords: ['선행', '조사', '회피'] },
      { label: '명세서', keywords: ['명세서', '발명', '청구항', '조성'] },
      { label: '출원·OA', keywords: ['출원', 'OA', '의견서', '보정'] },
      { label: '권리·연차료', keywords: ['등록', '연차료', '납부', '권리'] },
      { label: '기타', keywords: [] },
    ],
  },
  test: {
    title: '시험/분석의뢰 세부 업무량 현황',
    subtitle: '시험기획, 기관 협의, 결과 해석까지 분석 의뢰 업무를 세분화합니다.',
    consoleLabel: '시험/분석의뢰',
    types: ['시험·분석 의뢰'],
    columns: [
      { label: '시험기획', keywords: ['시험', '항목', '목적', '계획'] },
      { label: '기관 협의', keywords: ['기관', '협의', '회신', '일정'] },
      { label: '시료·조건', keywords: ['시료', '조건', '라벨', '발송'] },
      { label: '결과 수합', keywords: ['결과', '성적서', '이미지', '수합'] },
      { label: '해석·보고', keywords: ['해석', '보고', 'KPI', '근거'] },
      { label: '기타', keywords: [] },
    ],
  },
  budget: {
    title: '예산/장비 세부 업무량 현황',
    subtitle: '예산 증빙, 비교견적, 규격 검토, 구매·정산 업무의 분포를 확인합니다.',
    consoleLabel: '예산/장비',
    types: ['예산·장비'],
    columns: [
      { label: '예산 증빙', keywords: ['예산', '증빙', '사용계획'] },
      { label: '장비 견적', keywords: ['견적', '비교견적', '업체'] },
      { label: '규격 검토', keywords: ['규격', '사양', '스펙'] },
      { label: '구매·계약', keywords: ['구매', '계약', '발주', '입고'] },
      { label: '정산', keywords: ['정산', '집행', '연구비'] },
      { label: '기타', keywords: [] },
    ],
  },
  outcome: {
    title: '성과/기술료 세부 업무량 현황',
    subtitle: '성과 수합, 매출 산출, 기술료 납부 준비의 담당자별 업무량입니다.',
    consoleLabel: '성과/기술료',
    types: ['성과·기술료'],
    columns: [
      { label: '성과 수합', keywords: ['성과', '실적', '활용'] },
      { label: '매출 산출', keywords: ['매출', '산출', '근거'] },
      { label: '기술료', keywords: ['기술료', '요율', '납부'] },
      { label: '보고자료', keywords: ['보고', '자료', '최종'] },
      { label: '납부 일정', keywords: ['마감', '일정', '기간'] },
      { label: '기타', keywords: [] },
    ],
  },
  labadmin: {
    title: '연구소 행정 세부 업무량 현황',
    subtitle: '법정 의무, 연구소 운영, 자료 제출 업무가 누구에게 몰려 있는지 봅니다.',
    consoleLabel: '연구소 행정',
    types: ['연구소 행정'],
    columns: [
      { label: '법정 의무', keywords: ['법정', '의무', '점검'] },
      { label: '자산·시설', keywords: ['자산', '시설', '장비', '연구소'] },
      { label: '교육·점검', keywords: ['교육', '점검', '이력'] },
      { label: '변경 신고', keywords: ['변경', '신고', '인력'] },
      { label: '자료 제출', keywords: ['제출', '자료', '대장'] },
      { label: '기타', keywords: [] },
    ],
  },
  assets: {
    title: '자료 제작 세부 업무량 현황',
    subtitle: '발표자료, 보고서, IR 자료, 시각화 산출물의 제작 집중도를 표시합니다.',
    consoleLabel: '자료 제작',
    types: ['자료 제작'],
    columns: [
      { label: '발표자료', keywords: ['발표', '대면평가', 'PPT', 'Deck'] },
      { label: '보고서', keywords: ['보고서', '연차', '최종', '월간'] },
      { label: 'IR 자료', keywords: ['IR', 'VC', '투자'] },
      { label: '시각화', keywords: ['도식', '포스터', '시각화', '그림'] },
      { label: '검토·내보내기', keywords: ['검토', '수정', '내보내기', '출력'] },
      { label: '기타', keywords: [] },
    ],
  },
};

function normalizeWorkloadText(value) {
  return String(value ?? '').toLowerCase();
}

function getWorkloadText(item) {
  return normalizeWorkloadText([
    item.type,
    item.project,
    item.workCategory,
    item.task,
    item.stage,
    item.evidenceNeed,
    item.institution,
    item.memo,
    item.nextAction,
  ].join(' '));
}

function isClosedWorkItem(item) {
  return item.status === '종결';
}

function findWorkloadColumnIndex(item, columns) {
  const explicitCategory = String(item.workCategory ?? '').trim();
  const explicitIndex = columns.findIndex((column) => column.label === explicitCategory);
  if (explicitIndex >= 0) return explicitIndex;

  const text = getWorkloadText(item);
  const matchedIndex = columns.findIndex((column) => {
    const labelMatch = text.includes(normalizeWorkloadText(column.label));
    const keywordMatch = column.keywords?.some((keyword) => text.includes(normalizeWorkloadText(keyword)));
    return labelMatch || keywordMatch;
  });
  if (matchedIndex >= 0) return matchedIndex;
  return Math.max(0, columns.length - 1);
}

function getWorkloadSpecForType(type) {
  return Object.values(workloadModuleSpecs).find((spec) => spec.types.includes(type));
}

function getWorkCategoryOptions(contextId, type) {
  const spec = workloadModuleSpecs[contextId] ?? getWorkloadSpecForType(type);
  return spec?.columns.map((column) => column.label) ?? [type || '업무'];
}

function getDefaultWorkCategory(contextId, type) {
  return getWorkCategoryOptions(contextId, type)[0] ?? type ?? '업무';
}

function normalizeWorkCategory(contextId, type, value) {
  const options = getWorkCategoryOptions(contextId, type);
  const normalizedValue = String(value ?? '').trim();
  return options.includes(normalizedValue) ? normalizedValue : options[0] ?? normalizedValue ?? type ?? '업무';
}

function inferWorkCategory(contextId, type, item) {
  const options = getWorkCategoryOptions(contextId, type);
  const normalizedCategory = String(item.workCategory ?? '').trim();
  if (options.includes(normalizedCategory)) return normalizedCategory;

  const spec = workloadModuleSpecs[contextId] ?? getWorkloadSpecForType(type);
  if (!spec) return options[0] ?? type ?? '업무';

  const inferredIndex = findWorkloadColumnIndex({ ...item, workCategory: '' }, spec.columns);
  return spec.columns[inferredIndex]?.label ?? options[0] ?? type ?? '업무';
}

function mapRoyaltyRowToWorkloadItem(row) {
  return {
    id: `ROY-WORK-${row.id}`,
    type: '성과·기술료',
    project: row.project,
    workCategory: normalizeWorkCategory('outcome', '성과·기술료', row.workCategory),
    task: `${row.project || '성과·기술료'} ${row.rate ? `기술료 ${row.rate}` : '성과 관리'}`,
    owner: row.owner ?? '김태현 과장',
    coOwner: '공동 담당자',
    stage: '진행',
    due: row.dueDate,
    evidenceNeed: row.period || row.dueAmount || '성과·기술료 근거',
    institution: row.institution || row.type,
    risk: '중',
    status: row.status ?? '진행 중',
    lastUpdate: row.dueDate?.slice(5).replace('-', '.') ?? '06.09',
    memo: `${row.type} 성과·기술료 목록 행`,
    blocker: '-',
    nextAction: '납부 근거 확인',
  };
}

function mapLabAdminRowToWorkloadItem(row) {
  return {
    id: `LAB-WORK-${row.id}`,
    type: '연구소 행정',
    project: row.type,
    workCategory: normalizeWorkCategory('labadmin', '연구소 행정', row.workCategory),
    task: row.task,
    owner: row.owner,
    coOwner: '공동 담당자',
    stage: row.status,
    due: row.dueDate ?? '',
    evidenceNeed: row.type,
    institution: row.institution,
    risk: '중',
    status: row.status,
    lastUpdate: '06.09',
    memo: `${row.type} 연구소 행정 목록 행`,
    blocker: '-',
    nextAction: '상태 확인',
  };
}

function mapEquipmentItemToWorkloadItem(item) {
  return {
    id: `EQ-WORK-${item.id}`,
    type: '예산·장비',
    project: '장비 도입 현황',
    workCategory: inferWorkCategory('budget', '예산·장비', item),
    task: item.name || '장비 도입 업무',
    owner: item.owner ?? '박지수 대리',
    coOwner: '공동 담당자',
    stage: item.status,
    due: item.contractDate || item.purchaseDate || item.receivedDate || '',
    evidenceNeed: item.note || '장비 도입 근거',
    institution: item.vendor || '공급업체',
    risk: item.status === '진행 중' ? '중' : '낮음',
    status: item.status === '구매 완료' ? '종결' : '진행 중',
    lastUpdate: '06.09',
    memo: item.details || '장비 도입 현황 목록 행',
    blocker: '-',
    nextAction: item.status === '진행 중' ? '비교견적 확인' : '도입 정보 확인',
  };
}

function mapTestRequestToWorkloadItem(item) {
  return {
    id: `TESTREQ-WORK-${item.id}`,
    type: '시험·분석 의뢰',
    project: item.project || '시험·분석 의뢰',
    workCategory: inferWorkCategory('test', '시험·분석 의뢰', item),
    task: item.item || '시험·분석 의뢰',
    owner: item.requester ?? '이주형 대리',
    coOwner: '공동 담당자',
    stage: '의뢰',
    due: item.requestDate,
    evidenceNeed: item.duration || '분석 일정',
    institution: item.institution,
    risk: '중',
    status: '진행 중',
    lastUpdate: item.requestDate?.slice(5).replace('-', '.') ?? '06.09',
    memo: item.purpose,
    blocker: '-',
    nextAction: item.interpretation || '결과 수합',
  };
}

function buildOperationalWorkloadItems(workItems, royaltyRows, labAdminRows, equipmentItems, testRequestItems) {
  const safeWorkItems = Array.isArray(workItems) ? workItems : [];
  const safeRoyaltyRows = Array.isArray(royaltyRows) ? royaltyRows : [];
  const safeLabAdminRows = Array.isArray(labAdminRows) ? labAdminRows : [];
  const safeEquipmentItems = Array.isArray(equipmentItems) ? equipmentItems : [];
  const safeTestRequestItems = Array.isArray(testRequestItems) ? testRequestItems : [];
  const registerItems = safeWorkItems.filter((item) => !['성과·기술료', '연구소 행정'].includes(item.type));
  return [
    ...registerItems,
    ...safeRoyaltyRows.map(mapRoyaltyRowToWorkloadItem),
    ...safeLabAdminRows.map(mapLabAdminRowToWorkloadItem),
    ...safeEquipmentItems.map(mapEquipmentItemToWorkloadItem),
    ...safeTestRequestItems.map(mapTestRequestToWorkloadItem),
  ];
}

function getWorkloadContributors(item) {
  return [
    { name: item.owner, value: 1 },
    { name: item.coOwner, value: 0.5 },
  ].filter((entry) => entry.name && entry.name !== '공동 담당자');
}

function formatWorkloadValue(value) {
  if (!value) return '-';
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function heatClassName(value) {
  if (!value) return 'heat-0';
  return `heat-${Math.min(5, Math.ceil(value))}`;
}

function buildWorkloadMatrix(sourceItems, spec) {
  const columns = spec.columns.map((column) => column.label);
  const memberRows = members.map((member) => ({
    name: member.name,
    short: member.short,
    color: member.color,
    values: Array.from({ length: columns.length }, () => 0),
  }));
  const rowMap = new Map(memberRows.map((row) => [row.name, row]));

  sourceItems
    .filter((item) => spec.types.includes(item.type) && !isClosedWorkItem(item))
    .forEach((item) => {
      const columnIndex = findWorkloadColumnIndex(item, spec.columns);
      getWorkloadContributors(item).forEach((entry) => {
        const row = rowMap.get(entry.name);
        if (row) {
          row.values[columnIndex] += entry.value;
        }
      });
    });

  const columnTotals = columns.map((_, index) => memberRows.reduce((sum, row) => sum + row.values[index], 0));
  const rows = memberRows.map((row) => ({
    ...row,
    total: row.values.reduce((sum, value) => sum + value, 0),
  }));
  const total = rows.reduce((sum, row) => sum + row.total, 0);
  const topMember = rows.slice().sort((a, b) => b.total - a.total)[0] ?? null;
  const topColumnIndex = columnTotals.reduce((bestIndex, value, index, totals) => (value > totals[bestIndex] ? index : bestIndex), 0);

  return {
    columns,
    rows,
    columnTotals,
    total,
    topMember: topMember?.total ? topMember : null,
    topColumn: columnTotals[topColumnIndex] ? { label: columns[topColumnIndex], value: columnTotals[topColumnIndex] } : null,
  };
}

function buildConsoleWorkloadData(sourceItems) {
  const consoleSpec = {
    columns: workloadModuleOrder.map((id) => ({ label: workloadModuleSpecs[id].consoleLabel, moduleId: id })),
  };
  const memberRows = members.map((member) => ({
    name: member.name,
    short: member.short,
    color: member.color,
    values: Array.from({ length: consoleSpec.columns.length }, () => 0),
  }));
  const rowMap = new Map(memberRows.map((row) => [row.name, row]));

  sourceItems
    .filter((item) => !isClosedWorkItem(item))
    .forEach((item) => {
      const columnIndex = consoleSpec.columns.findIndex((column) => workloadModuleSpecs[column.moduleId].types.includes(item.type));
      if (columnIndex < 0) return;
      getWorkloadContributors(item).forEach((entry) => {
        const row = rowMap.get(entry.name);
        if (row) {
          row.values[columnIndex] += entry.value;
        }
      });
    });

  const columns = consoleSpec.columns.map((column) => column.label);
  const columnTotals = columns.map((_, index) => memberRows.reduce((sum, row) => sum + row.values[index], 0));
  const rows = memberRows.map((row) => ({
    ...row,
    total: row.values.reduce((sum, value) => sum + value, 0),
  }));
  const total = rows.reduce((sum, row) => sum + row.total, 0);
  const topMember = rows.slice().sort((a, b) => b.total - a.total)[0] ?? null;
  const topColumnIndex = columnTotals.reduce((bestIndex, value, index, totals) => (value > totals[bestIndex] ? index : bestIndex), 0);

  return {
    columns,
    rows,
    columnTotals,
    total,
    topMember: topMember?.total ? topMember : null,
    topColumn: columnTotals[topColumnIndex] ? { label: columns[topColumnIndex], value: columnTotals[topColumnIndex] } : null,
  };
}

const initialTeamCheckins = [
  {
    id: 'CHK-2026-0608-01',
    date: '2026-06-08',
    member: '김태현 과장',
    itemId: 'REQ-2026-061',
    project: '차세대 고효율 모터 개발',
    task: '연차별 상세계획 수립',
    workStatus: '보완 필요',
    summary: '연차별 추진계획과 예산계획 초안을 취합했고 전년도 결과 데이터 반영만 남았습니다.',
    blocker: '전년도 결과 반영 데이터 일부 미확보',
    nextAction: '6/10 내부 확인 후 보완',
    evidence: '계획서(안), 추진일정표',
    objectiveSignals: { evidenceSubmitted: true, externalReplyNeeded: true, reviewNeeded: true, dueChangeNeeded: false },
    status: '확인됨',
  },
  {
    id: 'CHK-2026-0608-02',
    date: '2026-06-08',
    member: '박지수 대리',
    itemId: 'REQ-2026-059',
    project: '산업기술혁신사업',
    task: '신청서 및 사업계획서 작성',
    workStatus: '작성',
    summary: '공고 요건과 신청서 목차를 정리했고 재무 증빙과 견적서 수합을 진행 중입니다.',
    blocker: '공급업체 견적서 수신 대기',
    nextAction: '관리팀 요청자료 취합',
    evidence: '공고문, 사업계획서 초안',
    objectiveSignals: { evidenceSubmitted: true, externalReplyNeeded: true, reviewNeeded: false, dueChangeNeeded: false },
    status: '입력됨',
  },
  {
    id: 'CHK-2026-0608-03',
    date: '2026-06-08',
    member: '이주형 대리',
    itemId: 'REQ-2026-060',
    project: '차세대 고효율 모터 개발',
    task: '주간 현황 점검',
    workStatus: '진행 중',
    summary: '참여기관별 진도와 시험 조건 회신을 취합했고 위탁기관 일정 확정이 필요합니다.',
    blocker: '위탁기관 시험 일정 확정 필요',
    nextAction: '참여기관 의견 회신 취합',
    evidence: '진도보고서',
    objectiveSignals: { evidenceSubmitted: true, externalReplyNeeded: false, reviewNeeded: false, dueChangeNeeded: true },
    status: '입력됨',
  },
  {
    id: 'CHK-2026-0608-04',
    date: '2026-06-08',
    member: '이민주 대리',
    itemId: 'REQ-2026-058',
    project: '모터 제어 알고리즘',
    task: '특허 출원 초안 작성',
    workStatus: '보완 필요',
    summary: '명세서 초안과 선행기술 메모를 정리했고 성능 비교 실험표 보완이 필요합니다.',
    blocker: '성능 비교 실험표 보완 필요',
    nextAction: '발명자 검토 의견 취합',
    evidence: '명세서 초안, 선행기술 메모',
    objectiveSignals: { evidenceSubmitted: true, externalReplyNeeded: true, reviewNeeded: true, dueChangeNeeded: false },
    status: '입력됨',
  },
];

const initialCompletedWorkLogs = [];

const initialWorkComments = [
  {
    id: 'CMT-001',
    itemId: 'REQ-2026-061',
    member: '박지수 대리',
    date: '2026-06-08',
    text: '예산 산출 근거는 연구비 총괄표와 맞춰서 다시 확인하겠습니다.',
  },
  {
    id: 'CMT-002',
    itemId: 'REQ-2026-057',
    member: '김태현 과장',
    date: '2026-06-08',
    text: '시험기관 회신이 오면 조건표와 결과서 양식을 같은 증빙 묶음으로 남겨주세요.',
  },
];

const typeColors = {
  연구개발과제: 'blue',
  지원사업: 'purple',
  '특허/IP': 'violet',
  '시험·분석 의뢰': 'amber',
  '예산·장비': 'cyan',
  '성과·기술료': 'green',
  '연구소 행정': 'gray',
  '자료 제작': 'rose',
};

const moduleConfigs = {
  portfolio: {
    title: '과제 포트폴리오',
    subtitle: '수행 중 과제, 신청 준비 과제, 종료/사후관리 과제를 한 화면에서 관리합니다.',
    types: ['연구개발과제', '지원사업', '성과·기술료'],
    icon: FolderKanban,
    primary: '과제 등록',
    workflow: ['공고/기획', '신청/협약', '연차 수행', '보고/평가', '성과/기술료'],
    highlights: [
      ['진행 중 과제', '6건', '내부/공동/위탁 포함'],
      ['신청 준비', '3건', '공고 검토 및 사업계획서 작성'],
      ['사후관리', '4건', '매출·기술료·성과 보고'],
    ],
  },
  execution: {
    title: '과제 수행 워크스페이스',
    subtitle: '연차 일정, 정량목표, 시험 의뢰, 회의자료, 증빙자료를 과제 안에서 연결합니다.',
    types: ['연구개발과제', '시험·분석 의뢰', '예산·장비'],
    icon: ClipboardList,
    primary: '주간 현황 입력',
    workflow: ['연차 계획', '주간 현황', 'KPI/증빙', '시험 의뢰', '보고서 작성'],
    highlights: [
      ['정량목표', '12개', '9개 근거 연결'],
      ['외부기관 협의', '5건', '시험 조건/평가 일정'],
      ['보완 필요', '3건', 'KPI 근거 및 보고서 문안'],
    ],
  },
  support: {
    title: '지원사업/공고',
    subtitle: '바우처, 연구인력, IP, ESG 등 간접 지원사업을 탐색·신청·수행·사후관리합니다.',
    types: ['지원사업'],
    icon: BriefcaseBusiness,
    primary: '공고 검토 등록',
    workflow: ['공고 탐색', '적합성 검토', '신청서 작성', '수행 조율', '사후조사'],
    highlights: [
      ['신청 가능', '7건', '연구개발 관련 공고'],
      ['작성 중', '2건', '사업계획서/증빙 수합'],
      ['사후조사', '1건', '연계 사업 검토'],
    ],
  },
  ip: {
    title: '특허/IP',
    subtitle: '출원, OA, 등록, 연차료, 명세서 검토, 포트폴리오 전략을 관리합니다.',
    types: ['특허/IP'],
    icon: ShieldCheck,
    primary: 'IP 일정 등록',
    workflow: ['아이디어 접수', '선행기술', '명세서 검토', '출원/OA', '등록/연차료'],
    highlights: [
      ['출원 준비', '4건', '명세서 및 실험표 보완'],
      ['OA 대응', '2건', '의견서/보정서 일정'],
      ['연차료', '12건', '90일 이내 납부 검토'],
    ],
  },
  test: {
    title: '시험·분석 의뢰',
    subtitle: '시험기관, 대학, 외부 평가기관과 조건·일정·결과서 양식을 협의합니다.',
    types: ['시험·분석 의뢰'],
    icon: FlaskConical,
    primary: '시험 의뢰 등록',
    workflow: ['항목 정의', '기관 협의', '견적/일정', '샘플 발송', '결과 수합'],
    highlights: [
      ['진행 중 의뢰', '6건', 'KCL/대학/평가기관'],
      ['응답 대기', '3건', '조건표 회신 필요'],
      ['보고서 수합', '2건', 'KPI 근거 연결 전'],
    ],
  },
  budget: {
    title: '예산·장비',
    subtitle: '연구비 사용계획, 장비 견적·규격·활용계획·설치 일정을 관리합니다.',
    types: ['예산·장비'],
    icon: WalletCards,
    primary: '예산 증빙 등록',
    workflow: ['사용계획', '견적 수합', '규격 검토', '구매/설치', '정산 증빙'],
    highlights: [
      ['예산 증빙', '11건', '미제출 4건'],
      ['장비 도입', '2건', '설치 공간 협의'],
      ['비교견적', '3건', '보완 필요'],
    ],
  },
  outcome: {
    title: '성과·기술료',
    subtitle: '제품화 성과, 매출 실적, 기술료 대상 제품, 경상기술료 납부 일정을 관리합니다.',
    types: ['성과·기술료'],
    icon: BarChart3,
    primary: '성과 입력',
    workflow: ['성과 수합', '매출 산출', '기술료 분류', '보고자료', '납부 일정'],
    highlights: [
      ['성과 보고', '5건', '종료과제/기술이전 포함'],
      ['매출 증빙', '3건', '외부 자료 대기'],
      ['납부 일정', '2건', '분기 정산 예정'],
    ],
  },
  labadmin: {
    title: '연구소 행정',
    subtitle: '기업부설연구소 인력·시설·자산, 법정 의무사항, 변경 신고를 관리합니다.',
    types: ['연구소 행정'],
    icon: Building2,
    primary: '행정 업무 등록',
    workflow: ['현황 조사', '자료 수합', '신고/제출', '보완 대응', '이력 관리'],
    highlights: [
      ['법정 의무', '4건', '1건 기한 경과'],
      ['자산 업데이트', '1건', '안양연구소 확인 필요'],
      ['변경 신고', '2건', '인력/시설 현황'],
    ],
  },
  assets: {
    title: '자료 제작',
    subtitle: '정부과제 발표자료, 보고자료, IR/VC 대응자료, 포스터 시각화 자료를 제작합니다.',
    types: ['자료 제작'],
    icon: FileText,
    primary: '자료 초안 생성',
    workflow: ['자료 요청', '근거 연결', '초안 생성', '검토/수정', '내보내기'],
    highlights: [
      ['IR/VC 자료', '2건', 'IP·성과 업데이트 필요'],
      ['보고자료', '6건', '월간/연차 평가 대응'],
      ['포스터/시각화', '3건', '출력용 레이아웃 검토'],
    ],
  },
  chatgpt: {
    title: 'ChatGPT 업무지원',
    subtitle: '과제 기획, 수행 업무, 특허, 시험 의뢰, 예산·성과 문서 초안을 업무 맥락과 함께 작성합니다.',
    types: ['연구개발과제', '지원사업', '특허/IP', '시험·분석 의뢰', '예산·장비', '성과·기술료', '연구소 행정', '자료 제작'],
    icon: MessageSquareText,
    primary: '질문 작성',
    workflow: ['업무 선택', '질문 작성', 'AI 초안', '검토/수정', '업무 반영'],
    highlights: [
      ['연결 컨텍스트', '업무·과제', '선택한 업무와 과제 정보를 함께 전달'],
      ['기본 모델', 'gpt-5.5-pro', 'Apps Script 설정값으로 변경 가능'],
      ['키 보관', 'Script Properties', 'GitHub Pages에 API Key 미포함'],
    ],
  },
  team: {
    title: '팀 업무 입력',
    subtitle: '팀원이 주간 진행, 막힌 항목, 다음 액션, 증빙 파일을 직접 입력합니다.',
    types: ['연구개발과제', '지원사업', '특허/IP', '시험·분석 의뢰', '자료 제작', '연구소 행정'],
    icon: UsersRound,
    primary: '내 업무 입력',
    workflow: ['이번 주 업무', '상태 입력', '증빙 첨부', '막힌 항목', '보고 요청'],
    highlights: [
      ['입력 대기', '8건', '주간 현황/증빙'],
      ['마감 대기', '4건', '마감 처리 필요'],
      ['막힌 항목', '5건', '외부 회신/자료 수합'],
    ],
  },
};

const projectPlans = [
  { label: '1차년도', status: '상세계획 보완', items: ['협약/전산등록', '상세계획 보완', '시험항목 확정'] },
  { label: '2차년도', status: '검증 준비', items: ['성능 검증', '위탁기관 평가', '중간보고'] },
  { label: '3차년도', status: '성과 계획', items: ['제품화 성과', '매출 실적', '최종보고'] },
];

const kpiEvidence = [
  { goal: '정량 성능 목표 달성', current: '83%', evidence: '시험성적서 2건', owner: '이주형 대리', status: '근거 충분' },
  { goal: '특허 출원/등록', current: '2/4건', evidence: '명세서 초안', owner: '이민주 대리', status: '보완 필요' },
  { goal: '사업화 매출 근거', current: '수집 중', evidence: '매출 산출표', owner: '박지수 대리', status: '보완 필요' },
  { goal: '외부기관 협업', current: '5기관', evidence: '회의록/협약서', owner: '김태현 과장', status: '진행 중' },
];

const initialProjectPortfolioItems = [
  {
    id: 'PRJ-MOTOR-2026',
    status: '수행 중',
    ministry: '산업통상자원부',
    agency: '한국에너지기술평가원',
    program: '소재부품기술개발',
    projectNo: '20025431',
    name: '차세대 고효율 모터 개발',
    director: '김태현 과장',
    period: '2026-04-01 ~ 2028-12-31',
    leadOrg: '켐랜드 기술연구소',
    jointOrg: 'A대학교 산학협력단',
    consignedOrg: 'KCL',
    yearlyTargets: '1차년도 효율 92% 검증, 2차년도 온도 상승 8% 저감, 3차년도 실증 시제품 2종',
    yearlyResearch: '1차년도 설계/시험 조건 확정, 2차년도 알고리즘/시제품 개선, 3차년도 사업화 검증',
    focus: '시험 조건 확정, 전년도 결과 반영, 참여기관별 산출물 정리',
    contacts: '전문기관: energy-pms@agency.or.kr / 공동기관: lab@auniv.ac.kr / 시험기관: kcl-test@kcl.re.kr',
    attachments: ['연구계획서.pdf', '대면평가_발표자료.pptx', '1차년도_연차보고서.docx'],
  },
  {
    id: 'PRJ-ALGO-IP',
    status: '신청 중',
    ministry: '중소벤처기업부',
    agency: '중소기업기술정보진흥원',
    program: '중소기업 기술혁신개발',
    projectNo: 'TIPS-2026-081',
    name: '모터 제어 알고리즘',
    director: '이민주 대리',
    period: '2026-07-01 ~ 2027-12-31',
    leadOrg: '켐랜드 기술연구소',
    jointOrg: '특허법인 OO',
    consignedOrg: '-',
    yearlyTargets: '1차년도 제어 오차 5% 이내, 2차년도 특허 2건 출원',
    yearlyResearch: '제어 로직 정리, 선행기술 회피 설계, 성능 비교 실험',
    focus: '사업계획서 기술성 근거와 특허 청구항 범위 정리',
    contacts: '전문기관: smtech@tipa.or.kr / 특허법인: ip-manager@example.com',
    attachments: ['사업계획서_초안.docx', '선행기술조사.xlsx'],
  },
  {
    id: 'PRJ-POST-CARE',
    status: '종료',
    ministry: '과학기술정보통신부',
    agency: '연구개발특구진흥재단',
    program: '기술사업화 역량강화',
    projectNo: 'RDB-2024-339',
    name: '종료과제 사후관리',
    director: '박지수 대리',
    period: '2024-01-01 ~ 2025-12-31',
    leadOrg: '켐랜드 기술연구소',
    jointOrg: '-',
    consignedOrg: '-',
    yearlyTargets: '최종보고서 제출, 기술료 정산, 성과 활용보고 1회',
    yearlyResearch: '성과자료 정리, 매출액 근거 수합, 기술이전 이력 관리',
    focus: '성과 활용보고와 경상기술료 납부 자료 정리',
    contacts: '전문기관: biz-rnd@example.or.kr / 기술료 담당: royalty@example.or.kr',
    attachments: ['최종보고서.pdf', '성과활용보고서.xlsx'],
  },
];

const initialProjectTargetRows = [
  { id: 'TGT-001', projectId: 'PRJ-MOTOR-2026', goal: '모터 효율', unit: '%', year1: '92', year2: '94', year3: '95', owner: '이주형 대리', status: '진행 중' },
  { id: 'TGT-002', projectId: 'PRJ-MOTOR-2026', goal: '온도 상승 저감', unit: '%', year1: '5', year2: '8', year3: '10', owner: '이주형 대리', status: '근거 수집' },
  { id: 'TGT-003', projectId: 'PRJ-ALGO-IP', goal: '특허 출원', unit: '건', year1: '1', year2: '2', year3: '-', owner: '이민주 대리', status: '작성' },
  { id: 'TGT-004', projectId: 'PRJ-POST-CARE', goal: '성과 활용보고', unit: '회', year1: '1', year2: '-', year3: '-', owner: '박지수 대리', status: '마감 대기' },
];

const initialExecutionPlans = [
  {
    id: 'EXEC-MOTOR-2026',
    projectId: 'PRJ-MOTOR-2026',
    projectName: '차세대 고효율 모터 개발',
    monthly: [
      { month: '6월', title: '시험 조건 확정', owner: '이주형 대리', status: '진행 중' },
      { month: '7월', title: '시제품 1차 시험', owner: '이주형 대리', status: '계획' },
      { month: '8월', title: '연차보고 산출물 정리', owner: '김태현 과장', status: '계획' },
      { month: '9월', title: '참여기관 성과 회의', owner: '박지수 대리', status: '계획' },
    ],
    goals: ['효율 시험 조건 확정', '증빙 파일 연결', '참여기관 산출물 회수'],
  },
  {
    id: 'EXEC-ALGO-IP',
    projectId: 'PRJ-ALGO-IP',
    projectName: '모터 제어 알고리즘',
    monthly: [
      { month: '6월', title: '청구항 범위 정리', owner: '이민주 대리', status: '작성' },
      { month: '7월', title: '성능 비교 실험', owner: '이주형 대리', status: '계획' },
      { month: '8월', title: '사업계획서 보완', owner: '김태현 과장', status: '계획' },
    ],
    goals: ['제어 오차 근거 확보', '특허 출원 초안 작성', '사업계획서 기술성 보강'],
  },
];

const initialEquipmentItems = [
  {
    id: 'EQ-001',
    status: '구매 완료',
    name: '입도 분포 분석기',
    vendor: '마이크로트랙코리아',
    model: 'MT-3300',
    purchaseDate: '2026-05-20',
    receivedDate: '2026-05-27',
    contractDate: '2026-05-14',
    price: 18500000,
    note: '장비 검수 완료',
    details: '사파이어 분말과 구상 실리카 비드의 입도 분포 분석용 장비입니다. 설치 위치는 안양연구소 분석실.',
    quoteSpecs: ['측정 범위', '분산 방식'],
    quotes: [
      { vendor: '마이크로트랙코리아', model: 'MT-3300', firstPrice: 19800000, finalPrice: 18500000, specs: { '측정 범위': '0.02~2000um', '분산 방식': '습식/건식' } },
      { vendor: '입도과학', model: 'LS-210', firstPrice: 20300000, finalPrice: 19200000, specs: { '측정 범위': '0.05~1500um', '분산 방식': '습식' } },
      { vendor: '분석솔루션', model: 'PSD-500', firstPrice: 21000000, finalPrice: 19900000, specs: { '측정 범위': '0.03~1800um', '분산 방식': '습식/건식' } },
    ],
  },
  {
    id: 'EQ-002',
    status: '진행 중',
    name: '주사전자현미경 이미지 분석 모듈',
    vendor: '',
    model: '',
    purchaseDate: '',
    receivedDate: '',
    contractDate: '',
    price: 0,
    note: '비교견적 수합 중',
    details: '판상 사파이어 분말과 구상 실리카 비드의 입자 이미지 분석을 위한 모듈입니다. 최소 3개 업체 비교견적 필요.',
    quoteSpecs: ['해상도', '자동 분석'],
    quotes: [
      { vendor: '에이분석', model: 'SEM-AI-300', firstPrice: 42000000, finalPrice: 39800000, specs: { 해상도: '5MP', '자동 분석': '지원' } },
      { vendor: '비전랩', model: 'IMG-PRO-280', firstPrice: 41500000, finalPrice: 40200000, specs: { 해상도: '4MP', '자동 분석': '부분 지원' } },
      { vendor: '씨앤사이언스', model: 'PART-320', firstPrice: 43500000, finalPrice: 41000000, specs: { 해상도: '6MP', '자동 분석': '지원' } },
    ],
  },
  {
    id: 'EQ-003',
    status: '진행 예정',
    name: '제형 분산 안정성 평가 장비',
    vendor: '',
    model: '',
    purchaseDate: '',
    receivedDate: '',
    contractDate: '',
    price: 0,
    note: '2차년도 도입 예정',
    details: '무기 분말의 색조/선케어 제형 내 분산 안정성 확인용 장비입니다. 예산 배정 후 견적 수합 예정.',
    quoteSpecs: ['측정 방식'],
    quotes: [
      { vendor: '', model: '', firstPrice: 0, finalPrice: 0, specs: { '측정 방식': '' } },
      { vendor: '', model: '', firstPrice: 0, finalPrice: 0, specs: { '측정 방식': '' } },
      { vendor: '', model: '', firstPrice: 0, finalPrice: 0, specs: { '측정 방식': '' } },
    ],
  },
];

const initialTestRequestItems = [
  {
    id: 'TESTREQ-001',
    requestDate: '2026-06-05',
    institution: 'KCL',
    item: '효율/온도 특성 시험',
    requester: '이주형 대리',
    purpose: '차세대 고효율 모터 개발 KPI 근거 확보',
    project: '차세대 고효율 모터 개발',
    interpretation: '부하 조건별 효율 변화와 온도 상승폭을 비교하여 연차 목표 달성 여부를 판단합니다.',
    images: ['시험조건표.png', '샘플배치_01.jpg', '온도센서위치.jpg'],
  },
  {
    id: 'TESTREQ-002',
    requestDate: '2026-06-09',
    institution: 'A대학교',
    item: '제어 알고리즘 성능 비교',
    requester: '이민주 대리',
    purpose: '특허 출원 명세서 실험 데이터 보강',
    project: '모터 제어 알고리즘',
    interpretation: '제어 오차와 발열 저감 효과를 기존 방식과 비교합니다.',
    images: ['알고리즘_파형_01.png', '비교실험_그래프.png'],
  },
];

const seedProjectPortfolioItems = [
  {
    id: 'PRJ-BSP',
    status: '수행 중',
    ministry: '산업통상부',
    agency: '한국산업기술기획평가원',
    program: '소재부품기술개발(패키지형)',
    projectNo: 'RS-2024-00432810',
    name: '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발',
    director: '김태현 과장',
    period: '2024.07.01. ~ 2027.12.31.',
    leadOrg: '케미랜드',
    jointOrg: '연세대학교, 성균관대학교, 금호피앤비화학, 한국소재융합연구원',
    jointOrgs: ['연세대학교', '성균관대학교', '금호피앤비화학', '한국소재융합연구원'],
    consignedOrg: '',
    consignedOrgs: [],
    contacts: '전문기관: KEIT 과제 담당자 / 공동기관: 기관별 실무 담당자',
    contactRows: ['KEIT 과제 담당자', '연세대학교 실무 담당자', '성균관대학교 실무 담당자', '금호피앤비화학 실무 담당자', '한국소재융합연구원 실무 담당자'],
    yearlyTargets: '1차년도 원료 합성 조건 확립, 2차년도 저열변형 원료 평가, 3차년도 BSP 적용성 검증',
    yearlyQuantTargets: [
      { id: 'YQT-BSP-1', goal: '고순도 원료 순도', unit: '%', year: '1차년도', target: '99.5 이상', note: '합성/정제 조건 확립' },
      { id: 'YQT-BSP-2', goal: '열변형률', unit: '%', year: '2차년도', target: '기준 대비 10 저감', note: '보호필름 적용 평가' },
      { id: 'YQT-BSP-3', goal: 'BSP 적용 샘플', unit: '종', year: '3차년도', target: '2', note: '고객 평가용 샘플' },
    ],
    yearlyResearch: '1차년도 합성 조건/분석법 확립, 2차년도 배합 및 필름 적용 평가, 3차년도 스케일업/신뢰성 검증',
    yearlyResearchRows: ['1차년도: 합성 조건 및 분석법 확립', '2차년도: 배합 및 필름 적용 평가', '3차년도: 스케일업 및 신뢰성 검증'],
    focus: '원료 순도, 열변형 평가 조건, 공동기관별 산출물 회수',
    attachments: ['BSP_연구계획서.pdf', 'BSP_대면평가_발표자료.pptx', 'BSP_연차보고서.docx'],
  },
  {
    id: 'PRJ-SAPPHIRE',
    status: '수행 중',
    ministry: '산업통상부',
    agency: '한국산업기술기획평가원',
    program: '소재부품기술개발(투자연계-자유공모형)',
    projectNo: 'RS-2025-24535767',
    name: '색조 화장품용 사파이어 단결정 분말 제조 및 응용 기술 개발',
    director: '김태현 과장',
    period: '2025.07.01. ~ 2027.12.31.',
    leadOrg: '케미랜드',
    jointOrg: '한국세라믹기술원, 연세대학교, 한국콜마',
    jointOrgs: ['한국세라믹기술원', '연세대학교', '한국콜마'],
    consignedOrg: '',
    consignedOrgs: [],
    contacts: '전문기관: KEIT 과제 담당자 / 공동기관: 한국세라믹기술원, 연세대학교, 한국콜마',
    contactRows: ['KEIT 과제 담당자', '한국세라믹기술원 실무 담당자', '연세대학교 실무 담당자', '한국콜마 제형 담당자'],
    yearlyTargets: '1차년도 판상 사파이어 분말 제조, 2차년도 색조 제형 적용성 검토, 3차년도 양산 조건 정리',
    yearlyQuantTargets: [
      { id: 'YQT-SAP-1', goal: '판상 입자 균일도', unit: '%', year: '1차년도', target: '80 이상', note: '입도/형상 분석' },
      { id: 'YQT-SAP-2', goal: '색조 제형 적용 샘플', unit: '종', year: '2차년도', target: '3', note: '한국콜마 제형 평가' },
      { id: 'YQT-SAP-3', goal: '분말 제조 배치', unit: 'kg', year: '3차년도', target: '5', note: '스케일업 확인' },
    ],
    yearlyResearch: '단결정 분말 제조, 입자 형상 제어, 색조 화장품 적용성 및 사용감 평가',
    yearlyResearchRows: ['1차년도: 분말 제조 조건 탐색', '2차년도: 색조 화장품 적용성 평가', '3차년도: 양산 조건 및 품질 기준 정리'],
    focus: '입자 형상 분석, 색조 제형 적용성, 공동기관 시험 일정',
    attachments: ['사파이어_연구계획서.pdf', '사파이어_발표자료.pptx'],
  },
  {
    id: 'PRJ-SILICA',
    status: '신청 중',
    ministry: '중소기업벤처부',
    agency: '중소기업기술정보진흥원',
    program: '중소기업기술혁신개발사업(시장확대형-스케일업팁스)',
    projectNo: 'RS-2025-16072564',
    name: '화장품용 기능성 구상 실리카 비드의 합성과 그 응용 기술 개발',
    director: '김태현 과장',
    period: '2025.06.01. ~ 2028.05.31.',
    leadOrg: '케미랜드',
    jointOrg: '인하대학교',
    jointOrgs: ['인하대학교'],
    consignedOrg: '',
    consignedOrgs: [],
    contacts: '전문기관: TIPA 과제 담당자 / 공동기관: 인하대학교 실무 담당자',
    contactRows: ['TIPA 과제 담당자', '인하대학교 실무 담당자'],
    yearlyTargets: '1차년도 구상 실리카 합성 조건 확립, 2차년도 기능성 표면처리, 3차년도 화장품 적용성 검증',
    yearlyQuantTargets: [
      { id: 'YQT-SIL-1', goal: '구상도', unit: '%', year: '1차년도', target: '90 이상', note: '입자 이미지 분석' },
      { id: 'YQT-SIL-2', goal: '오일 흡유량', unit: 'g/100g', year: '2차년도', target: '120 이하', note: '사용감 개선 지표' },
      { id: 'YQT-SIL-3', goal: '제형 적용 샘플', unit: '종', year: '3차년도', target: '4', note: '파우더/선케어 적용' },
    ],
    yearlyResearch: '구상 실리카 합성, 기능성 표면처리, 화장품 제형 적용성 및 스케일업 검토',
    yearlyResearchRows: ['1차년도: 합성 조건 확립', '2차년도: 기능성 표면처리', '3차년도: 제형 적용성 및 스케일업 검증'],
    focus: '사업계획서 보완, 인하대학교 역할 범위, 시험 분석 항목 정의',
    attachments: ['스케일업팁스_사업계획서.docx', '구상실리카_실험계획표.xlsx'],
  },
];

const seedProjectTargetRows = [
  { id: 'TGT-BSP-ADD-1', projectId: 'PRJ-BSP', goal: '저열변형 원료 파일럿 배치', unit: 'kg', year1: '1', year2: '3', year3: '5', note: '파일럿 합성 배치 기준' },
  { id: 'TGT-SAP-ADD-1', projectId: 'PRJ-SAPPHIRE', goal: '색조 제형 만족도', unit: '점', year1: '-', year2: '4.0', year3: '4.3', note: '공동기관 관능/제형 평가' },
  { id: 'TGT-SIL-ADD-1', projectId: 'PRJ-SILICA', goal: '표면처리 후보군', unit: '종', year1: '2', year2: '4', year3: '6', note: '추가 목표' },
];

const seedExecutionPlans = [
  {
    id: 'EXEC-BSP',
    projectId: 'PRJ-BSP',
    projectName: '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발',
    monthly: [
      { id: 'SCH-BSP-1', category: '원료 합성 조건', title: '고순도 원료 합성 조건 보완', startMonth: 6, endMonth: 8, owner: '김태현 과장', status: '진행 중' },
      { id: 'SCH-BSP-2', category: '분석/평가', title: '순도 및 열변형 평가 조건 확정', startMonth: 7, endMonth: 10, owner: '이주형 대리', status: '계획' },
      { id: 'SCH-BSP-3', category: '보고/협업', title: '공동기관 산출물 수합', startMonth: 9, endMonth: 12, owner: '박지수 대리', status: '계획' },
    ],
    goals: [
      { id: 'GOAL-BSP-1', goal: '원료 순도 분석법 확정', metric: '분석법 1식', due: '2026-07-31', note: '내부 분석 SOP 고정' },
      { id: 'GOAL-BSP-2', goal: '저열변형 평가 조건 확정', metric: '평가 조건표', due: '2026-09-30', note: '공동기관 검토 포함' },
    ],
  },
  {
    id: 'EXEC-SAPPHIRE',
    projectId: 'PRJ-SAPPHIRE',
    projectName: '색조 화장품용 사파이어 단결정 분말 제조 및 응용 기술 개발',
    monthly: [
      { id: 'SCH-SAP-1', category: '분말 제조', title: '판상 사파이어 분말 제조 조건 탐색', startMonth: 6, endMonth: 9, owner: '김태현 과장', status: '진행 중' },
      { id: 'SCH-SAP-2', category: '입자 분석', title: '입도/형상 분석 의뢰', startMonth: 8, endMonth: 10, owner: '이주형 대리', status: '계획' },
      { id: 'SCH-SAP-3', category: '제형 적용', title: '색조 제형 적용성 협의', startMonth: 10, endMonth: 12, owner: '이민주 대리', status: '계획' },
    ],
    goals: [
      { id: 'GOAL-SAP-1', goal: '판상 입자 균일도 확보', metric: '80% 이상', due: '2026-09-30', note: 'SEM 이미지 근거' },
      { id: 'GOAL-SAP-2', goal: '색조 제형 적용성 항목 정의', metric: '평가표 1식', due: '2026-11-15', note: '한국콜마 협의' },
    ],
  },
  {
    id: 'EXEC-SILICA',
    projectId: 'PRJ-SILICA',
    projectName: '화장품용 기능성 구상 실리카 비드의 합성과 그 응용 기술 개발',
    monthly: [
      { id: 'SCH-SIL-1', category: '사업계획 보완', title: '스케일업팁스 사업계획서 보완', startMonth: 6, endMonth: 7, owner: '김태현 과장', status: '작성' },
      { id: 'SCH-SIL-2', category: '합성 실험', title: '구상 실리카 합성 조건 스크리닝', startMonth: 8, endMonth: 11, owner: '이주형 대리', status: '계획' },
      { id: 'SCH-SIL-3', category: '공동기관 협의', title: '인하대학교 역할 및 시험 항목 확정', startMonth: 7, endMonth: 9, owner: '박지수 대리', status: '계획' },
    ],
    goals: [
      { id: 'GOAL-SIL-1', goal: '사업계획서 기술성 근거 보완', metric: '보완본 제출', due: '2026-07-15', note: '시장확대형 논리 보강' },
      { id: 'GOAL-SIL-2', goal: '구상 실리카 합성 후보 조건 도출', metric: '3조건', due: '2026-10-31', note: '입자 이미지 포함' },
    ],
  },
];

const seedTestRequestItems = [
  {
    id: 'TESTREQ-BSP-001',
    requestDate: '2026-06-05',
    institution: '한국소재융합연구원',
    item: 'BSP 원료 순도 및 열변형 평가',
    requester: '이주형 대리',
    duration: '14일',
    purpose: '백사이드 보호필름용 원료의 순도와 열변형 특성 검증',
    project: '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발',
    interpretation: '합성 조건별 원료 순도와 열변형률을 비교하여 연차 목표 달성 여부를 판단합니다.',
    images: ['BSP_시료라벨.jpg', '열변형_측정조건.png', '순도분석_크로마토그램.png'],
  },
  {
    id: 'TESTREQ-SAP-001',
    requestDate: '2026-06-09',
    institution: '한국세라믹기술원',
    item: '판상 사파이어 분말 입도/형상 분석',
    requester: '김태현 과장',
    duration: '10일',
    purpose: '색조 화장품용 판상 사파이어 분말의 입자 형상과 균일도 확인',
    project: '색조 화장품용 사파이어 단결정 분말 제조 및 응용 기술 개발',
    interpretation: 'SEM 이미지와 입도 분포를 기준으로 제형 적용 가능성을 판단합니다.',
    images: ['사파이어_SEM_01.png', '입도분포_결과.png'],
  },
  {
    id: 'TESTREQ-SIL-001',
    requestDate: '2026-06-12',
    institution: '인하대학교',
    item: '구상 실리카 비드 입자 이미지 및 흡유량 분석',
    requester: '박지수 대리',
    duration: '21일',
    purpose: '기능성 구상 실리카 비드의 화장품 적용성 기초 지표 확보',
    project: '화장품용 기능성 구상 실리카 비드의 합성과 그 응용 기술 개발',
    interpretation: '구상도, 입도, 흡유량을 함께 보고 사용감 개선 가능성을 판단합니다.',
    images: ['구상실리카_입자이미지.png', '흡유량_측정표.png'],
  },
];

const seedWorkItems = [
  {
    id: 'REQ-2026-061',
    type: '연구개발과제',
    project: '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발',
    workCategory: '원료 합성 조건',
    task: '고순도 원료 합성 조건 보완',
    owner: '김태현 과장',
    coOwner: '이주형 대리',
    stage: '수행',
    due: '2026-06-30',
    evidence: ['BSP_실험계획표.xlsx', '원료합성_조건표.docx'],
    evidenceNeed: '합성 조건별 순도 근거',
    institution: '케미랜드',
    risk: '중',
    status: '진행 중',
    lastUpdate: '06-09',
    memo: 'BSP 원료 합성 조건과 정제 조건을 연차 목표 기준으로 보완합니다.',
    blocker: '일부 분석 결과 회신 대기',
    nextAction: '조건별 순도 결과표 업데이트',
    export: 'XLSX',
  },
  {
    id: 'REQ-2026-060',
    type: '시험·분석 의뢰',
    project: '색조 화장품용 사파이어 단결정 분말 제조 및 응용 기술 개발',
    workCategory: '입자 분석',
    task: '판상 사파이어 분말 SEM/입도 분석 의뢰',
    owner: '이주형 대리',
    coOwner: '김태현 과장',
    stage: '의뢰',
    due: '2026-07-05',
    evidence: ['분석의뢰서', '시료목록'],
    evidenceNeed: '시료 이미지/조건표',
    institution: '한국세라믹기술원',
    risk: '중',
    status: '외부 협의',
    lastUpdate: '06-09',
    memo: '판상 사파이어 분말의 입자 형상과 입도 분포 분석을 의뢰합니다.',
    blocker: '시료 발송 일정 확정 필요',
    nextAction: '시료 라벨과 분석 조건표 송부',
    export: 'XLSX',
  },
  {
    id: 'REQ-2026-059',
    type: '지원사업',
    project: '화장품용 기능성 구상 실리카 비드의 합성과 그 응용 기술 개발',
    workCategory: '사업계획 보완',
    task: '스케일업팁스 사업계획서 기술성 보완',
    owner: '김태현 과장',
    coOwner: '박지수 대리',
    stage: '작성',
    due: '2026-07-15',
    evidence: ['사업계획서_보완본.docx', '시장성_근거자료.xlsx'],
    evidenceNeed: '시장 확대 근거',
    institution: '중소기업기술정보진흥원',
    risk: '높음',
    status: '작성',
    lastUpdate: '06-09',
    memo: '화장품용 기능성 구상 실리카 비드의 시장성, 차별성, 스케일업 계획을 보완합니다.',
    blocker: '공동기관 역할 범위 최종 확인 필요',
    nextAction: '인하대학교 세부 역할 회신 반영',
    export: 'DOCX',
  },
  {
    id: 'REQ-2026-058',
    type: '특허/IP',
    project: '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발',
    workCategory: 'IP 전략',
    task: '저열변형 원료 조성 특허 초안 검토',
    owner: '이민주 대리',
    coOwner: '김태현 과장',
    stage: '작성',
    due: '2026-07-20',
    evidence: ['발명신고서', '실험데이터_요약표'],
    evidenceNeed: '조성 범위 실험 근거',
    institution: '특허법인 OO',
    risk: '중',
    status: '보완 필요',
    lastUpdate: '06-09',
    memo: '저열변형 특성을 보이는 조성 범위와 제조 조건의 권리화 가능성을 검토합니다.',
    blocker: '비교예 데이터 보완 필요',
    nextAction: '발명자 인터뷰 일정 확정',
    export: 'DOCX',
  },
  {
    id: 'REQ-2026-057',
    type: '예산·장비',
    project: '색조 화장품용 사파이어 단결정 분말 제조 및 응용 기술 개발',
    workCategory: '분석 장비',
    task: '입자 형상 분석 장비 비교견적 수합',
    owner: '박지수 대리',
    coOwner: '이주형 대리',
    stage: '확인',
    due: '2026-07-10',
    evidence: ['비교견적표', '장비사양서'],
    evidenceNeed: '3개 업체 비교견적',
    institution: '분석장비 공급업체',
    risk: '낮음',
    status: '진행 중',
    lastUpdate: '06-09',
    memo: '입자 형상 분석과 이미지 저장에 필요한 장비 후보 견적을 비교합니다.',
    blocker: '-',
    nextAction: '최종 견적가 업데이트',
    export: 'XLSX',
  },
  {
    id: 'REQ-2026-056',
    type: '자료 제작',
    project: '화장품용 기능성 구상 실리카 비드의 합성과 그 응용 기술 개발',
    workCategory: '발표자료',
    task: '스케일업팁스 대면평가 발표자료 작성',
    owner: '김태현 과장',
    coOwner: '이민주 대리',
    stage: '작성',
    due: '2026-07-01',
    evidence: ['발표자료_목차.pptx', '기술차별성_도식.pptx'],
    evidenceNeed: '사업화 로드맵',
    institution: '-',
    risk: '중',
    status: '작성',
    lastUpdate: '06-09',
    memo: '구상 실리카 비드 합성 기술과 화장품 응용성을 평가 발표 흐름으로 정리합니다.',
    blocker: '매출/시장 자료 최신 수치 필요',
    nextAction: '시장 자료 업데이트',
    export: 'PPTX',
  },
  {
    id: 'REQ-2026-055',
    type: '연구개발과제',
    project: '색조 화장품용 사파이어 단결정 분말 제조 및 응용 기술 개발',
    workCategory: '제형 적용',
    task: '한국콜마 색조 제형 적용성 평가 항목 협의',
    owner: '이민주 대리',
    coOwner: '김태현 과장',
    stage: '계획',
    due: '2026-08-12',
    evidence: ['평가항목_초안.xlsx'],
    evidenceNeed: '제형 평가 기준',
    institution: '한국콜마',
    risk: '중',
    status: '계획',
    lastUpdate: '06-09',
    memo: '판상 사파이어 분말의 발림성, 광택, 분산성 평가 항목을 공동기관과 협의합니다.',
    blocker: '-',
    nextAction: '평가표 초안 공유',
    export: 'XLSX',
  },
  {
    id: 'REQ-2026-054',
    type: '연구소 행정',
    project: '법정 의무',
    workCategory: '연구소 운영',
    task: '화학물질 취급 관련 법정 점검 자료 정리',
    owner: '박지수 대리',
    coOwner: '이주형 대리',
    stage: '진행',
    due: '2026-06-28',
    evidence: ['화학물질_취급대장.xlsx'],
    evidenceNeed: '취급대장/교육이력',
    institution: '유관기관',
    risk: '중',
    status: '진행 중',
    lastUpdate: '06-09',
    memo: '화장품용 무기 소재 합성 관련 취급 대장과 교육 이력을 정리합니다.',
    blocker: '교육 이력 일부 미확인',
    nextAction: '교육 이수자 목록 확인',
    export: 'PDF',
  },
  {
    id: 'REQ-2026-ROYALTY-001',
    type: '성과·기술료',
    project: '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발',
    workCategory: '기술료 산출',
    task: '정부과제 기술료 납부액 산출 및 매출 근거 정리',
    owner: '박지수 대리',
    coOwner: '김태현 과장',
    stage: '정산',
    due: '2026-09-30',
    evidence: ['매출산출표.xlsx', '기술료_검토표.xlsx'],
    evidenceNeed: '전년도 매출액 및 납부 대상 제품 근거',
    institution: '전문기관',
    risk: '낮음',
    status: '계획',
    lastUpdate: '06-09',
    memo: '성과·기술료 탭에서 관리하는 납부 대상 과제와 매출 근거를 정리합니다.',
    blocker: '-',
    nextAction: '전년도 매출액 기준표 업데이트',
    export: 'XLSX',
  },
];

const seedExternalRequests = [
  {
    id: 'EXT-BSP-001',
    project: '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발',
    institution: '한국소재융합연구원',
    request: 'BSP 원료 열변형 평가 조건 회신',
    owner: '이주형 대리',
    due: '2026-06-28',
    status: '회신 대기',
    channel: '이메일',
    lastMemo: '시료 수량과 열변형 측정 조건표 송부 필요',
  },
  {
    id: 'EXT-SAP-001',
    project: '색조 화장품용 사파이어 단결정 분말 제조 및 응용 기술 개발',
    institution: '한국세라믹기술원',
    request: '사파이어 분말 SEM/입도 분석 가능 일정 확인',
    owner: '김태현 과장',
    due: '2026-07-03',
    status: '자료 요청',
    channel: '이메일',
    lastMemo: '판상 입자 분석 조건과 이미지 해상도 요구사항 확인 중',
  },
  {
    id: 'EXT-SIL-001',
    project: '화장품용 기능성 구상 실리카 비드의 합성과 그 응용 기술 개발',
    institution: '인하대학교',
    request: '공동연구 역할 범위 및 시험 항목 확인',
    owner: '박지수 대리',
    due: '2026-07-10',
    status: '진행 중',
    channel: '회의/메일',
    lastMemo: '흡유량, 입자 이미지, 제형 적용성 항목을 정리 중',
  },
];

const seedBudgetRows = [
  {
    id: 'BUD-BSP-2026',
    project: '백사이드 보호필름용 고순도, 저열변형 화학 원료 제조 기술 개발',
    year: '2026',
    equipment: 22000000,
    material: 48000000,
    activity: 16000000,
    labor: 94000000,
    allowance: 13000000,
    overhead: 18000000,
  },
  {
    id: 'BUD-SAP-2026',
    project: '색조 화장품용 사파이어 단결정 분말 제조 및 응용 기술 개발',
    year: '2026',
    equipment: 30000000,
    material: 36000000,
    activity: 14000000,
    labor: 76000000,
    allowance: 11000000,
    overhead: 15000000,
  },
  {
    id: 'BUD-SIL-2026',
    project: '화장품용 기능성 구상 실리카 비드의 합성과 그 응용 기술 개발',
    year: '2026',
    equipment: 18000000,
    material: 42000000,
    activity: 12000000,
    labor: 68000000,
    allowance: 9000000,
    overhead: 13000000,
  },
];

const outcomeRoyaltyRows = [
  { id: 'ROY-001', type: '정부', institution: '한국산업기술기획평가원', workCategory: '기술료', project: 'BSP 과제 사후 성과관리', owner: '김태현 과장', rate: '2.5%', period: '2026.07~2026.09', lastSales: '1,240,000,000', dueAmount: '31,000,000', dueDate: '2026-09-30' },
  { id: 'ROY-002', type: '연구소', institution: '케미랜드 기업부설연구소', workCategory: '매출 산출', project: '무기 소재 매출 산출 근거', owner: '박지수 대리', rate: '1.8%', period: '2026.04~2026.06', lastSales: '820,000,000', dueAmount: '14,760,000', dueDate: '2026-06-25' },
  { id: 'ROY-003', type: '대학', institution: '연세대학교', workCategory: '보고자료', project: '공동연구 성과 활용 보고', owner: '이민주 대리', rate: '0.8%', period: '2026.01~2026.12', lastSales: '320,000,000', dueAmount: '2,560,000', dueDate: '2026-12-20' },
];

const labAdminRows = [
  { id: 'LAB-001', type: '법정의무', workCategory: '자료 제출', task: '연구개발활동 조사', owner: '이민주 대리', institution: 'KOITA', url: 'https://www.koita.or.kr', status: '진행 중' },
  { id: 'LAB-002', type: '법정의무', workCategory: '법정 의무', task: '정밀안전진단 일정 점검', owner: '이민주 대리', institution: '안전진단기관', url: '-', status: '계획' },
  { id: 'LAB-003', type: '자체수행', workCategory: '자산·시설', task: '안양연구소 자산 목록 업데이트', owner: '박지수 대리', institution: '내부', url: '-', status: '보완 필요' },
];

const reportTemplates = {
  weekly: '주간 업무보고',
  status: '과제 현황보고',
  support: '지원사업 신청 체크리스트',
  ip: '특허/IP 마감 리포트',
};

const STORAGE_KEY = 'rd-project-ops-work-items-v4';
const CHECKIN_STORAGE_KEY = 'rd-project-ops-team-checkins-v2';
const DECISION_STORAGE_KEY = 'rd-project-ops-decision-resolutions-v1';
const EXTERNAL_REQUEST_STORAGE_KEY = 'rd-project-ops-external-requests-v1';
const TEST_INSTITUTION_STORAGE_KEY = 'rd-project-ops-test-institutions-v1';
const PATENT_STORAGE_KEY = 'rd-project-ops-patent-holdings-v1';
const BUDGET_STORAGE_KEY = 'rd-project-ops-budget-rows-v1';
const COMPLETED_WORK_STORAGE_KEY = 'rd-project-ops-completed-work-v1';
const WORK_COMMENT_STORAGE_KEY = 'rd-project-ops-work-comments-v1';
const PROJECT_PORTFOLIO_STORAGE_KEY = 'rd-project-ops-project-portfolio-v1';
const PROJECT_TARGET_STORAGE_KEY = 'rd-project-ops-project-targets-v1';
const EXECUTION_PLAN_STORAGE_KEY = 'rd-project-ops-execution-plans-v1';
const EQUIPMENT_STORAGE_KEY = 'rd-project-ops-equipment-items-v1';
const TEST_REQUEST_STORAGE_KEY = 'rd-project-ops-test-requests-v1';
const ROYALTY_STORAGE_KEY = 'rd-project-ops-royalty-rows-v1';
const LAB_ADMIN_STORAGE_KEY = 'rd-project-ops-lab-admin-rows-v1';
const SHARED_STATE_ENDPOINT = 'api/state';
const DEFAULT_FILTERS = { type: '전체', stage: '전체 단계', status: '전체 상태', owner: '전체 담당자', query: '' };
const statusOptions = ['계획', '작성', '진행 중', '외부 협의', '보완 필요', '마감 대기', '종결'];
const objectiveSignalOptions = [
  { key: 'evidenceSubmitted', label: '증빙 제출' },
  { key: 'externalReplyNeeded', label: '외부 회신 필요' },
  { key: 'reviewNeeded', label: '담당자 의견 필요' },
  { key: 'dueChangeNeeded', label: '마감 변경 필요' },
];

function readLocalValue(key, fallback) {
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

const legacyProjectKeywords = [
  '차세대 고효율 모터',
  '모터 제어 알고리즘',
  '고효율 모터',
  'Motor',
  'motor',
  '파워미터',
  '열화상 카메라',
  '종료과제 사후관리',
  '공동연구장비',
  '기술이전 A사',
];

function isLegacyExampleText(value) {
  return legacyProjectKeywords.some((keyword) => String(value ?? '').includes(keyword));
}

function hasLegacyExampleValue(value) {
  if (Array.isArray(value)) return value.some((item) => hasLegacyExampleValue(item));
  if (value && typeof value === 'object') return Object.values(value).some((item) => hasLegacyExampleValue(item));
  return isLegacyExampleText(value);
}

function mergeSeedById(seedItems, savedItems) {
  const saved = Array.isArray(savedItems) ? savedItems : [];
  const seedIds = new Set(seedItems.map((item) => item.id));
  const savedById = new Map(saved.filter((item) => !hasLegacyExampleValue(item)).map((item) => [item.id, item]));
  return [
    ...seedItems.map((item) => ({ ...item, ...(savedById.get(item.id) ?? {}) })),
    ...saved.filter((item) => !seedIds.has(item.id) && !hasLegacyExampleValue(item)),
  ];
}

function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toText(value) {
  return Array.isArray(value) ? value.join('\n') : value ?? '';
}

function mergeFileNames(current, fileList) {
  const currentItems = toList(current);
  const nextItems = Array.from(fileList ?? []).map((file) => file.name).filter(Boolean);
  return Array.from(new Set([...currentItems, ...nextItems]));
}

function removeListValue(current, value) {
  return toList(current).filter((item) => item !== value);
}

function normalizeUrl(value) {
  const url = String(value ?? '').trim();
  if (!url || url === '-') return '';
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function getRiskDisplay(value) {
  if (value === '높음') return '확인 필요';
  if (value === '중') return '관찰';
  return '안정';
}

function getRegisterSortValue(item, key) {
  if (key === 'risk') return getRiskDisplay(item.risk);
  return String(item?.[key] ?? '').toLowerCase();
}

function sortRegisterItems(items, sort) {
  const direction = sort.direction === 'desc' ? -1 : 1;
  return items.slice().sort((a, b) => {
    const left = getRegisterSortValue(a, sort.key);
    const right = getRegisterSortValue(b, sort.key);
    return left.localeCompare(right, 'ko-KR', { numeric: true }) * direction;
  });
}

function sanitizeProjectPortfolioItems(items) {
  const savedItems = mergeSeedById(seedProjectPortfolioItems, items);
  const cleanedItems = savedItems.filter(
    (item) => !(item.name === '신규 과제' && item.period === '2026-06-09 ~ ' && !item.ministry && !item.agency && !item.program && !item.projectNo)
  );
  const cleanedById = new Map(cleanedItems.map((item) => [item.id, item]));
  const defaultIds = new Set(seedProjectPortfolioItems.map((item) => item.id));
  return [
    ...seedProjectPortfolioItems.map((item) => cleanedById.get(item.id) ?? item),
    ...cleanedItems.filter((item) => !defaultIds.has(item.id)),
  ];
}

function sanitizeProjectTargetRows(items) {
  return mergeSeedById(seedProjectTargetRows, items).filter((item) => !isLegacyExampleText(item.projectId));
}

function sanitizeExecutionPlans(items) {
  return mergeSeedById(seedExecutionPlans, items).filter((item) => !isLegacyExampleText(item.projectName));
}

function sanitizeTestRequestItems(items) {
  return mergeSeedById(seedTestRequestItems, items)
    .filter((item) => !isLegacyExampleText(item.project))
    .map((item) => ({
      ...item,
      requester: item.requester ?? '이주형 대리',
      workCategory: inferWorkCategory('test', '시험·분석 의뢰', item),
      duration: item.duration ?? '14일',
      images: Array.isArray(item.images) ? item.images : toList(item.images),
    }));
}

function sanitizeTestInstitutions(items) {
  const saved = Array.isArray(items) ? items : [];
  const seedIds = new Set(initialTestInstitutions.map((item) => item.id));
  const legacyInstitutions = ['KCL', 'KTL', '한국자동차연구원', '위탁대학 공동장비센터'];
  const filtered = saved.filter((item) => !legacyInstitutions.includes(item.institution));
  const savedById = new Map(filtered.map((item) => [item.id, item]));
  return [
    ...initialTestInstitutions.map((item) => savedById.get(item.id) ?? item),
    ...filtered.filter((item) => !seedIds.has(item.id)),
  ];
}

function sanitizeWorkItems(items) {
  return mergeSeedById(seedWorkItems, items)
    .filter((item) => !isLegacyExampleText(item.project) && !isLegacyExampleText(item.task))
    .map((item) => {
      if (item.type === '자료 제작') {
        return { ...item, workCategory: inferWorkCategory('assets', '자료 제작', item) };
      }
      return item;
    });
}

function sanitizeExternalRequests(items) {
  return mergeSeedById(seedExternalRequests, items).filter((item) => !isLegacyExampleText(item.project) && !isLegacyExampleText(item.request));
}

function sanitizeBudgetRows(items) {
  return mergeSeedById(seedBudgetRows, items).filter((item) => item && typeof item === 'object' && !isLegacyExampleText(item.project));
}

function sanitizePatentHoldings(items) {
  return mergeSeedById(initialPatentHoldings, items).filter((item) => !hasLegacyExampleValue(item));
}

function normalizeRoyaltyRow(item) {
  return {
    ...item,
    owner: item.owner ?? '김태현 과장',
    institution: item.institution ?? item.type ?? '기관명 입력',
    workCategory: inferWorkCategory('outcome', '성과·기술료', item),
  };
}

function sanitizeRoyaltyRows(items) {
  return mergeSeedById(outcomeRoyaltyRows, items).filter((item) => !hasLegacyExampleValue(item)).map(normalizeRoyaltyRow);
}

function normalizeLabAdminRow(item) {
  return {
    ...item,
    owner: item.owner ?? '이민주 대리',
    status: item.status ?? '계획',
    workCategory: inferWorkCategory('labadmin', '연구소 행정', item),
  };
}

function sanitizeLabAdminRows(items) {
  return mergeSeedById(labAdminRows, items).filter((item) => !hasLegacyExampleValue(item)).map(normalizeLabAdminRow);
}

function normalizeEquipmentItem(item) {
  const quoteSpecs = Array.isArray(item.quoteSpecs) && item.quoteSpecs.length ? item.quoteSpecs : ['해상도', '측정 범위'];
  const sourceQuotes = Array.isArray(item.quotes) && item.quotes.length ? item.quotes : [];
  const quoteCount = Math.max(3, sourceQuotes.length);
  const quotes = Array.from({ length: quoteCount }, (_, index) => {
    const quote = sourceQuotes[index] ?? {};
    return {
      vendor: quote.vendor ?? '',
      model: quote.model ?? '',
      firstPrice: Number(quote.firstPrice) || 0,
      finalPrice: Number(quote.finalPrice) || 0,
      specs: {
        ...Object.fromEntries(quoteSpecs.map((spec) => [spec, ''])),
        ...(quote.specs ?? {}),
      },
    };
  });

  return {
    ...item,
    owner: item.owner ?? '박지수 대리',
    workCategory: inferWorkCategory('budget', '예산·장비', item),
    status: item.status || '진행 중',
    quoteSpecs,
    quotes,
  };
}

function sanitizeEquipmentItems(items) {
  return mergeSeedById(initialEquipmentItems, items).filter((item) => !hasLegacyExampleValue(item)).map(normalizeEquipmentItem);
}

function createDefaultSharedState() {
  return {
    workItems: seedWorkItems,
    teamCheckins: initialTeamCheckins,
    decisionResolutions: [],
    externalRequests: seedExternalRequests,
    testInstitutions: initialTestInstitutions,
    patents: initialPatentHoldings,
    budgetRows: seedBudgetRows,
    completedWorkLogs: initialCompletedWorkLogs,
    workComments: initialWorkComments,
    projectPortfolioItems: seedProjectPortfolioItems,
    projectTargetRows: seedProjectTargetRows,
    executionPlans: seedExecutionPlans,
    equipmentItems: initialEquipmentItems,
    testRequestItems: seedTestRequestItems,
    royaltyRows: outcomeRoyaltyRows,
    labAdminRows,
  };
}

function normalizeSharedState(value) {
  const source = value?.state ?? value?.data ?? value ?? {};
  const defaults = createDefaultSharedState();
  return Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => [key, Array.isArray(source[key]) ? source[key] : fallback])
  );
}

function getSharedStorageConfig() {
  const config = window.RD_OPS_CONFIG ?? {};
  const googleAppsScriptUrl = String(config.googleAppsScriptUrl ?? '').trim();
  const sharedStateEndpoint = String(config.sharedStateEndpoint ?? SHARED_STATE_ENDPOINT).trim();

  if (config.storageMode === 'google-drive' && googleAppsScriptUrl) {
    return {
      mode: 'google-drive',
      url: googleAppsScriptUrl,
      loadingMessage: 'Google Drive 저장소 확인 중',
      onlineMessage: 'Google Drive 저장소 연결됨',
      savedMessage: 'Google Drive 저장됨',
      savingMessage: 'Google Drive 저장 중',
      lostMessage: 'Google Drive 저장소 연결 끊김',
    };
  }

  return {
    mode: 'api',
    url: sharedStateEndpoint || SHARED_STATE_ENDPOINT,
    loadingMessage: '공유 저장소 확인 중',
    onlineMessage: '공유 저장소 연결됨',
    savedMessage: '공유 저장됨',
    savingMessage: '공유 저장 중',
    lostMessage: '공유 저장소 연결 끊김',
  };
}

function appendQueryParams(url, params) {
  const separator = url.includes('?') ? '&' : '?';
  const query = new URLSearchParams(params).toString();
  return `${url}${separator}${query}`;
}

function readGoogleDriveJsonp(url, params, timeoutMs, errorMessage) {
  return new Promise((resolveRead, rejectRead) => {
    const callbackName = `__rdOpsDrive_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    const timeout = window.setTimeout(() => {
      cleanup();
      rejectRead(new Error(`${errorMessage} timed out`));
    }, timeoutMs);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (payload) => {
      cleanup();
      resolveRead(payload);
    };
    script.onerror = () => {
      cleanup();
      rejectRead(new Error(errorMessage));
    };
    script.src = appendQueryParams(url, { ...params, callback: callbackName, _: Date.now() });
    document.head.appendChild(script);
  });
}

function readGoogleDriveState(url) {
  return readGoogleDriveJsonp(url, { action: 'read' }, 12000, 'Google Drive state read failed');
}

async function writeGoogleDriveState(url, state) {
  const body = new URLSearchParams();
  body.set('action', 'write');
  body.set('payload', JSON.stringify({ state }));
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body,
  });
}

function limitPromptText(value, maxLength) {
  const text = String(value ?? '');
  return text.length > maxLength ? `${text.slice(0, maxLength)}\n...[truncated]` : text;
}

async function requestChatGptSupport(url, payload) {
  const normalizedPayload = {
    ...payload,
    prompt: limitPromptText(payload?.prompt, 5000),
    context: limitPromptText(payload?.context, 8000),
  };
  const body = new URLSearchParams();
  body.set('action', 'chatgpt');
  body.set('payload', JSON.stringify(normalizedPayload));

  try {
    const response = await fetch(url, {
      method: 'POST',
      body,
    });
    if (!response.ok) throw new Error('ChatGPT proxy request failed');
    return response.json();
  } catch (error) {
    const payloadText = JSON.stringify(normalizedPayload);
    if (payloadText.length > 6500) {
      throw new Error('ChatGPT 요청이 깁니다. Apps Script POST 응답을 읽을 수 있도록 배포 설정을 확인한 뒤 다시 시도해주세요.');
    }
    return readGoogleDriveJsonp(url, { action: 'chatgpt', payload: payloadText }, 60000, 'ChatGPT proxy request failed');
  }
}

async function loadSharedEnvelope(storageConfig) {
  if (storageConfig.mode === 'google-drive') {
    return readGoogleDriveState(storageConfig.url);
  }

  const response = await fetch(storageConfig.url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('Shared state unavailable');
  return response.json();
}

async function saveSharedEnvelope(storageConfig, state) {
  if (storageConfig.mode === 'google-drive') {
    await writeGoogleDriveState(storageConfig.url, state);
    return;
  }

  const response = await fetch(storageConfig.url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ state }),
  });
  if (!response.ok) throw new Error('Shared state save failed');
}

function deriveObjectiveSignalsFromItem(item) {
  return {
    evidenceSubmitted: Boolean(item?.evidence?.length),
    externalReplyNeeded: item?.status === '외부 협의' || Boolean(item?.institution && item.institution !== '-'),
    reviewNeeded: Boolean(item?.status === '보완 필요' || item?.risk === '높음'),
    dueChangeNeeded: Boolean(item?.blocker && item.blocker !== '-' && daysLeft(item.due) <= 3),
  };
}

function getObjectiveSignalLabels(checkin, linkedItem) {
  const signals = checkin.objectiveSignals ?? deriveObjectiveSignalsFromItem(linkedItem);
  return objectiveSignalOptions.filter((option) => signals?.[option.key]).map((option) => option.label);
}

function createEmptyTestInstitution(seq) {
  return {
    id: `TEST-${Date.now()}`,
    seq,
    institution: '',
    testItem: '',
    url: '',
    accountId: '',
    password: '',
  };
}

function createEmptyPatentHolding() {
  return {
    id: `IP-${Date.now()}`,
    type: '국내 출원',
    title: '',
    applicationNo: '',
    applicationDate: '2026-06-08',
    registrationNo: '-',
    registrationDate: '-',
    product: '',
    specification: '',
    summary: '',
    history: ['2026-06-08 신규 특허 이력 입력'],
  };
}

function createEmptyTestRequest() {
  return {
    id: `TESTREQ-${Date.now()}`,
    requestDate: new Date().toISOString().slice(0, 10),
    institution: '',
    item: '',
    requester: '김태현 과장',
    workCategory: getDefaultWorkCategory('test', '시험·분석 의뢰'),
    duration: '14일',
    purpose: '',
    project: '',
    interpretation: '',
    images: [],
  };
}

function createEmptyBudgetRow() {
  return {
    id: `BUD-${Date.now()}`,
    project: '신규 과제',
    year: '2026',
    equipment: 0,
    material: 0,
    activity: 0,
    labor: 0,
    allowance: 0,
    overhead: 0,
  };
}

function createEmptyEquipmentItem() {
  const specs = ['해상도', '측정 범위'];
  return {
    id: `EQ-${Date.now()}`,
    status: '진행 중',
    owner: '박지수 대리',
    workCategory: getDefaultWorkCategory('budget', '예산·장비'),
    name: '',
    vendor: '',
    model: '',
    purchaseDate: '',
    receivedDate: '',
    contractDate: '',
    price: 0,
    note: '',
    details: '',
    quoteSpecs: specs,
    quotes: [1, 2, 3].map(() => ({
      vendor: '',
      model: '',
      firstPrice: 0,
      finalPrice: 0,
      specs: Object.fromEntries(specs.map((spec) => [spec, ''])),
    })),
  };
}

function createEmptyRoyaltyRow() {
  return {
    id: `ROY-${Date.now()}`,
    type: '정부',
    institution: '',
    workCategory: getDefaultWorkCategory('outcome', '성과·기술료'),
    project: '',
    owner: '김태현 과장',
    rate: '',
    period: '',
    lastSales: '',
    dueAmount: '',
    dueDate: new Date().toISOString().slice(0, 10),
  };
}

function createEmptyLabAdminRow() {
  return {
    id: `LAB-${Date.now()}`,
    type: '법정의무',
    workCategory: getDefaultWorkCategory('labadmin', '연구소 행정'),
    task: '',
    owner: '이민주 대리',
    institution: '',
    url: '',
    status: '계획',
  };
}

function createEmptyProjectPortfolioItem() {
  return {
    id: `PRJ-${Date.now()}`,
    status: '신청 중',
    ministry: '',
    agency: '',
    program: '',
    projectNo: '',
    name: '신규 과제',
    director: '김태현 과장',
    period: '2026-06-09 ~ ',
    leadOrg: '',
    jointOrg: '',
    jointOrgs: [],
    consignedOrg: '',
    consignedOrgs: [],
    yearlyTargets: '',
    yearlyQuantTargets: [],
    yearlyResearch: '',
    yearlyResearchRows: [],
    focus: '',
    contacts: '',
    contactRows: [],
    attachments: [],
  };
}

function getBudgetTotal(row) {
  return budgetAmountKeys.reduce((sum, item) => sum + (Number(row[item.key]) || 0), 0);
}

function formatWon(value) {
  return `${Math.round((Number(value) || 0) / 10000).toLocaleString('ko-KR')}만원`;
}

function displayValue(value, fallback = '-') {
  return value || fallback;
}

function maskSecret(value) {
  if (!value || value === '입력 필요') return '입력 필요';
  return '••••••••';
}

function useRowSelection(rows) {
  const rowIds = useMemo(() => rows.map((row) => row.id).filter(Boolean), [rows]);
  const rowIdsKey = rowIds.join('|');
  const [selectedIds, setSelectedIds] = useState([]);
  const selectedCount = selectedIds.length;
  const hasRows = rowIds.length > 0;
  const allSelected = hasRows && selectedIds.length === rowIds.length;

  useEffect(() => {
    setSelectedIds((ids) => {
      const visibleIds = new Set(rowIds);
      const nextIds = ids.filter((id) => visibleIds.has(id));
      return nextIds.length === ids.length ? ids : nextIds;
    });
  }, [rowIdsKey]);

  function toggleRow(id) {
    setSelectedIds((ids) => (ids.includes(id) ? ids.filter((selectedId) => selectedId !== id) : [...ids, id]));
  }

  function toggleAll() {
    setSelectedIds((ids) => (ids.length === rowIds.length ? [] : rowIds));
  }

  function clear() {
    setSelectedIds([]);
  }

  return {
    selectedIds,
    selectedCount,
    hasRows,
    allSelected,
    isSelected: (id) => selectedIds.includes(id),
    toggleRow,
    toggleAll,
    clear,
  };
}

function SelectionHeader({ selection, label }) {
  return (
    <th className="select-column" onClick={(event) => event.stopPropagation()}>
      <input
        aria-label={`${label} 전체 선택`}
        checked={selection.allSelected}
        disabled={!selection.hasRows}
        onChange={selection.toggleAll}
        type="checkbox"
      />
    </th>
  );
}

function SelectionCell({ checked, label, onChange }) {
  return (
    <td className="select-column" onClick={(event) => event.stopPropagation()}>
      <input aria-label={label} checked={checked} onChange={onChange} type="checkbox" />
    </td>
  );
}

function DeleteSelectedButton({ count, label = '선택 삭제', onClick }) {
  return (
    <button className="danger-button table-delete-action" disabled={!count} onClick={onClick} type="button">
      <Trash2 size={14} />
      {count ? `${label} ${count}` : label}
    </button>
  );
}

function FileAttachmentEditor({ label = '첨부 파일', files, onChange, accept }) {
  const fileItems = toList(files);

  return (
    <div className="file-attachment-editor">
      <div className="section-label">
        {label}
        <label className="file-upload-button">
          <Upload size={14} />
          파일 선택
          <input
            accept={accept}
            multiple
            onChange={(event) => {
              onChange(mergeFileNames(fileItems, event.target.files));
              event.target.value = '';
            }}
            type="file"
          />
        </label>
      </div>
      <div className="evidence-list">
        {fileItems.length ? (
          fileItems.map((file) => (
            <span className="evidence-chip editable" key={file}>
              <FileText size={14} />
              {file}
              <button onClick={() => onChange(removeListValue(fileItems, file))} type="button" aria-label={`${file} 삭제`}>
                <X size={12} />
              </button>
            </span>
          ))
        ) : (
          <p>등록된 파일이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

function SortableHeader({ label, sortKey, activeSort, onSort }) {
  const isActive = activeSort.key === sortKey;
  return (
    <th>
      <button className={`sortable-header ${isActive ? 'active' : ''}`} onClick={() => onSort(sortKey)} type="button">
        {label}
        <span>{isActive ? (activeSort.direction === 'asc' ? '▲' : '▼') : '↕'}</span>
      </button>
    </th>
  );
}

function getFileExtension(filename) {
  const match = String(filename ?? '').match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toUpperCase() : 'IMG';
}

function toCsvValue(value) {
  const normalized = Array.isArray(value) ? value.join(', ') : value ?? '';
  return `"${String(normalized).replace(/"/g, '""')}"`;
}

function downloadCsv(filename, columns, rows) {
  const header = columns.map((column) => toCsvValue(column.label)).join(',');
  const body = rows.map((row) => columns.map((column) => toCsvValue(row[column.key])).join(',')).join('\n');
  const blob = new Blob([`\uFEFF${header}\n${body}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function downloadTextFile(filename, text, type = 'text/plain;charset=utf-8;') {
  const blob = new Blob([`\uFEFF${text}`], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function workCsvRows(items) {
  return items.map((item) => ({
    type: item.type,
    project: item.project,
    task: item.task,
    owner: item.owner,
    coOwner: item.coOwner,
    stage: item.stage,
    status: item.status,
    due: item.due,
    evidenceNeed: item.evidenceNeed,
    institution: item.institution,
    risk: item.risk,
    lastUpdate: item.lastUpdate,
  }));
}

const workCsvColumns = [
  { key: 'type', label: '구분' },
  { key: 'project', label: '과제/사업명' },
  { key: 'task', label: '업무명' },
  { key: 'owner', label: '담당자' },
  { key: 'coOwner', label: '공동 담당자' },
  { key: 'stage', label: '단계' },
  { key: 'status', label: '상태' },
  { key: 'due', label: '마감일' },
  { key: 'evidenceNeed', label: '필요 증빙' },
  { key: 'institution', label: '외부기관' },
  { key: 'risk', label: '확인 상태' },
  { key: 'lastUpdate', label: '최근 업데이트' },
];

function assetWorkCsvRows(items) {
  return items.map((item) => ({
    workCategory: item.workCategory,
    task: item.task,
    owner: item.owner,
    status: item.status,
    due: item.due,
    evidenceNeed: item.evidenceNeed,
    institution: item.institution,
  }));
}

const assetWorkCsvColumns = [
  { key: 'workCategory', label: '업무 범주' },
  { key: 'task', label: '업무명' },
  { key: 'owner', label: '담당자' },
  { key: 'status', label: '상태' },
  { key: 'due', label: '마감' },
  { key: 'evidenceNeed', label: '필요 증빙' },
  { key: 'institution', label: '외부기관' },
];

const testInstitutionCsvColumns = [
  { key: 'seq', label: '순번' },
  { key: 'institution', label: '기관명' },
  { key: 'testItem', label: '시험 항목' },
  { key: 'url', label: 'URL' },
  { key: 'accountId', label: 'ID' },
  { key: 'password', label: 'Password' },
];

const patentCsvColumns = [
  { key: 'type', label: '특허 유형' },
  { key: 'title', label: '발명의 명칭' },
  { key: 'applicationNo', label: '출원번호' },
  { key: 'applicationDate', label: '출원일' },
  { key: 'registrationNo', label: '등록번호' },
  { key: 'registrationDate', label: '등록일' },
  { key: 'product', label: '적용 제품' },
  { key: 'specification', label: '명세서 등 증빙' },
];

const budgetCsvColumns = [
  { key: 'project', label: '과제' },
  { key: 'year', label: '연도' },
  ...budgetAmountKeys,
  { key: 'total', label: '합계' },
];

const projectPortfolioCsvColumns = [
  { key: 'status', label: '진행 상태' },
  { key: 'ministry', label: '주무부처' },
  { key: 'agency', label: '전문기관' },
  { key: 'program', label: '사업명' },
  { key: 'projectNo', label: '과제번호' },
  { key: 'name', label: '과제명' },
  { key: 'director', label: '연구책임자' },
  { key: 'period', label: '수행기간' },
  { key: 'leadOrg', label: '주관연구개발기관' },
  { key: 'jointOrg', label: '공동연구개발기관' },
  { key: 'consignedOrg', label: '위탁연구개발기관' },
  { key: 'contacts', label: '사업 담당자 연락처' },
];

const projectTargetCsvColumns = [
  { key: 'goal', label: '목표' },
  { key: 'unit', label: '단위' },
  { key: 'year1', label: '1차년도' },
  { key: 'year2', label: '2차년도' },
  { key: 'year3', label: '3차년도' },
  { key: 'note', label: '비고' },
];

const testRequestCsvColumns = [
  { key: 'requestDate', label: '의뢰일자' },
  { key: 'workCategory', label: '업무 범주' },
  { key: 'institution', label: '의뢰기관' },
  { key: 'item', label: '의뢰항목' },
  { key: 'requester', label: '의뢰자' },
  { key: 'duration', label: '소요기간' },
  { key: 'purpose', label: '의뢰 목적' },
  { key: 'project', label: '해당 과제' },
  { key: 'interpretation', label: '해석' },
];

const equipmentCsvColumns = [
  { key: 'status', label: '구분' },
  { key: 'workCategory', label: '업무 범주' },
  { key: 'owner', label: '담당자' },
  { key: 'name', label: '장비명' },
  { key: 'vendor', label: '업체명' },
  { key: 'model', label: '모델명' },
  { key: 'purchaseDate', label: '구매일자' },
  { key: 'receivedDate', label: '입고일자' },
  { key: 'contractDate', label: '계약일자' },
  { key: 'price', label: '구매가(VAT 제외)' },
  { key: 'note', label: '비고' },
];

const royaltyCsvColumns = [
  { key: 'type', label: '구분' },
  { key: 'workCategory', label: '업무 범주' },
  { key: 'institution', label: '기관명' },
  { key: 'project', label: '과제명' },
  { key: 'owner', label: '담당자' },
  { key: 'rate', label: '기술요율' },
  { key: 'period', label: '납부 기간' },
  { key: 'lastSales', label: '전년도 매출액' },
  { key: 'dueAmount', label: '당해년도 납부액' },
  { key: 'dueDate', label: '당해년도 납부 마감일' },
];

const labAdminCsvColumns = [
  { key: 'type', label: '구분' },
  { key: 'workCategory', label: '업무 범주' },
  { key: 'task', label: '업무명' },
  { key: 'owner', label: '담당자' },
  { key: 'institution', label: '유관기관' },
  { key: 'url', label: 'URL' },
  { key: 'status', label: '상태' },
];

const completedWorkCsvColumns = [
  { key: 'completedAt', label: '종결일' },
  { key: 'project', label: '과제/사업명' },
  { key: 'task', label: '업무명' },
  { key: 'owner', label: '담당자' },
  { key: 'completedBy', label: '마감 처리자' },
  { key: 'note', label: '종결 메모' },
];

function getDateRangeDays(dateRange) {
  const [startText, endText] = dateRange.split('~').map((item) => item.trim());
  const start = new Date(`${startText}T09:00:00`);
  const end = new Date(`${endText}T09:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return weekDays.map((day) => ({ ...day, weekday: day.label }));
  }

  const labels = ['일', '월', '화', '수', '목', '금', '토'];
  const days = [];
  for (const cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    const date = cursor.toISOString().slice(0, 10);
    days.push({
      date,
      label: labels[cursor.getDay()],
      short: date.slice(5).replace('-', '.'),
    });
  }
  return days;
}

const domainOperations = [
  {
    type: '연구개발과제',
    label: '과제기획·수행',
    rhythm: '연차 계획, KPI 근거, 보고자료',
    required: ['상세계획서', 'KPI 증빙', '보고서'],
  },
  {
    type: '지원사업',
    label: '지원사업',
    rhythm: '공고 검토, 신청서, 수행·사후관리',
    required: ['공고문', '사업계획서', '증빙'],
  },
  {
    type: '특허/IP',
    label: '특허/IP',
    rhythm: '발명 접수, 명세서, OA·연차료',
    required: ['명세서', '선행기술', '실험 근거'],
  },
  {
    type: '시험·분석 의뢰',
    label: '시험·분석',
    rhythm: '조건 협의, 견적, 결과서 수합',
    required: ['조건표', '견적/일정', '성적서'],
  },
  {
    type: '예산·장비',
    label: '예산·장비',
    rhythm: '사용계획, 비교견적, 정산 증빙',
    required: ['견적서', '규격서', '정산자료'],
  },
  {
    type: '성과·기술료',
    label: '성과·기술료',
    rhythm: '성과 수합, 매출 근거, 납부 일정',
    required: ['매출 증빙', '성과표', '기술료 산출'],
  },
  {
    type: '연구소 행정',
    label: '연구소 행정',
    rhythm: '인력·시설 현황, 법정 의무, 변경 신고',
    required: ['인력현황', '자산현황', '신고자료'],
  },
  {
    type: '자료 제작',
    label: '자료 제작',
    rhythm: '보고·IR·발표자료 초안과 검토',
    required: ['근거자료', '초안', '검토본'],
  },
];
const roleCoverageGroups = [
  {
    id: 'project',
    title: '1. 과제 관리',
    filterType: '연구개발과제',
    keywords: ['과제', '공고', '계획', '협약', '전산등록', '진도', '시험', '보고서', '참여기관', '킥오프', '성과 교류회'],
    duties: ['통합관리', '목표관리', '조달관리', '사후관리', '대외협력'],
  },
  {
    id: 'ip',
    title: '2. 지식재산권 관리',
    filterType: '특허/IP',
    keywords: ['특허', 'IP', '명세서', 'OA', '등록', '연차료', '포트폴리오', '권리보장', '기술이전'],
    duties: ['유지 관리', '업체 관리', '권리보장 전략', 'IP 지원사업', '기술료'],
  },
  {
    id: 'support',
    title: '3. 지원사업 관리',
    filterType: '지원사업',
    keywords: ['지원사업', '바우처', '컨설팅', '연구인력', 'ESG', '공급업체', '사후조사'],
    duties: ['탐색/신청', '수행 조율', '공급업체 자료', '사후관리'],
  },
  {
    id: 'materials',
    title: '4. 자료 제작',
    filterType: '자료 제작',
    keywords: ['IR', '투자자', '발표', '포스터', '시각화', '보고용 자료', '기술자료', '성과 교류회'],
    duties: ['IR자료', '과제 보고자료', '제품자료', '포스터 시각화'],
  },
  {
    id: 'lab',
    title: '5. 기업부설연구소 관리',
    filterType: '연구소 행정',
    keywords: ['연구소', '법정 의무', '연구개발활동', '정밀안전진단', '작업환경측정', '건강검진', '자산', '변경 신고'],
    duties: ['시설/인력현황', '변경 신고', '법정 의무사항', '자산 조사'],
  },
  {
    id: 'external',
    title: '6. 대외·기타 업무',
    filterType: '자료 제작',
    keywords: ['외부기관', '전문기관', '공동', '위탁', '대학', '출연연', 'VC', '투자사', '기술교류'],
    duties: ['외부 커뮤니케이션', '기술교류', '평가기관 대응', '투자사 대응'],
  },
];

const riskClass = {
  높음: 'risk-high',
  중: 'risk-mid',
  낮음: 'risk-low',
};

function daysLeft(date) {
  const due = new Date(`${date}T09:00:00`);
  const today = new Date('2026-06-08T09:00:00');
  return Math.ceil((due - today) / 86400000);
}

function hasBlocker(item) {
  return Boolean(item.blocker && item.blocker !== '-');
}

function matchesRoleCoverage(item, coverage) {
  const haystack = [
    item.type,
    item.project,
    item.task,
    item.owner,
    item.coOwner,
    item.memo,
    item.evidenceNeed,
    item.institution,
    item.blocker,
    item.nextAction,
    ...(item.evidence ?? []),
  ]
    .join(' ')
    .toLowerCase();
  return item.type === coverage.filterType || coverage.keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
}

function getFallbackReadiness(item) {
  const evidenceCount = Array.isArray(item.evidence) ? item.evidence.length : 0;
  if (hasBlocker(item)) return evidenceCount ? 55 : 35;
  if (item.status === '마감 대기' || item.status === '종결') return 82;
  if (evidenceCount >= 2) return 74;
  if (evidenceCount === 1) return 62;
  return 42;
}

function getProjectGates(projectName, projectItems = []) {
  if (projectGateProfiles[projectName]) return projectGateProfiles[projectName];
  const fallbackItem = projectItems[0];
  if (!fallbackItem) return [];
  return [
    {
      gate: `${fallbackItem.type} 운영 체크`,
      owner: fallbackItem.owner,
      due: fallbackItem.due,
      readiness: getFallbackReadiness(fallbackItem),
      status: fallbackItem.status,
      required: [fallbackItem.evidenceNeed, fallbackItem.export, '마감 확인'],
      missing: hasBlocker(fallbackItem) ? [fallbackItem.blocker] : ['추가 보완 없음'],
    },
  ];
}

function buildCalendarEntries(workItems, externalRequests) {
  const workEntries = workItems.map((item) => ({
    id: `work-${item.id}`,
    date: item.due,
    kind: '업무마감',
    title: item.task,
    project: item.project,
    owner: item.owner,
    tone: item.risk === '높음' ? 'red' : item.risk === '중' ? 'amber' : 'blue',
    itemId: item.id,
  }));

  const requestEntries = externalRequests.map((request) => ({
    id: `external-${request.id}`,
    date: request.due,
    kind: '외부회신',
    title: request.request,
    project: request.project,
    owner: request.owner,
    tone: request.status === '회신 대기' || request.status === '자료 요청' ? 'amber' : 'blue',
    requestId: request.id,
  }));

  const gateEntries = Object.entries(projectGateProfiles).flatMap(([project, gates]) =>
    gates.map((gate) => ({
      id: `gate-${project}-${gate.gate}`,
      date: gate.due,
      kind: '관리단계',
      title: gate.gate,
      project,
      owner: gate.owner,
      tone: gate.readiness < 50 ? 'red' : gate.readiness < 70 ? 'amber' : 'green',
      readiness: gate.readiness,
    }))
  );

  return [...workEntries, ...requestEntries, ...gateEntries]
    .filter((entry) => weekDays.some((day) => day.date === entry.date))
    .sort((a, b) => a.date.localeCompare(b.date) || a.project.localeCompare(b.project));
}

function buildDecisionItems(workItems) {
  const workRisks = workItems
    .filter((item) => item.risk === '높음' || (item.blocker && item.blocker !== '-'))
    .map((item) => ({
      id: `risk-${item.id}`,
      category: '업무 확인',
      severity: item.risk === '높음' ? '높음' : '중',
      title: item.blocker && item.blocker !== '-' ? item.blocker : `${item.task} 확인 필요`,
      subtitle: item.task,
      project: item.project,
      owner: item.owner,
      due: item.due,
      itemId: item.id,
    }));

  const gateRisks = Object.entries(projectGateProfiles).flatMap(([project, gates]) =>
    gates
      .filter((gate) => gate.missing.some((missing) => missing !== '추가 보완 없음'))
      .map((gate) => ({
        id: `gate-risk-${project}-${gate.gate}`,
        category: '산출물 보완',
        severity: gate.readiness < 50 ? '높음' : '중',
        title: gate.missing.join(', '),
        subtitle: gate.gate,
        project,
        owner: gate.owner,
        due: gate.due,
      }))
  );

  const severityRank = { 높음: 0, 중: 1, 낮음: 2 };
  return [...workRisks, ...gateRisks].sort((a, b) => severityRank[a.severity] - severityRank[b.severity] || String(a.due).localeCompare(String(b.due)));
}

function buildReportDraft(kind, items, selectedItem) {
  const dueSoon = items.filter((item) => daysLeft(item.due) <= 7);
  const highRisk = items.filter((item) => item.risk === '높음');
  const closeReady = items.filter((item) => item.status === '마감 대기' || item.status === '종결');
  const supportItems = items.filter((item) => item.type === '지원사업');
  const ipItems = items.filter((item) => item.type === '특허/IP');

  if (kind === 'status') {
    return [
      `[${reportTemplates[kind]}] ${selectedItem.project}`,
      '',
      '1. 과제 개요',
      `- 연결 업무: ${selectedItem.task}`,
      `- 담당자: ${selectedItem.owner} / 공동 담당: ${selectedItem.coOwner}`,
      `- 현재 단계/상태: ${selectedItem.stage} / ${selectedItem.status}`,
      '',
      '2. 정량목표 및 근거',
      ...kpiEvidence.map((item) => `- ${item.goal}: ${item.current} / ${item.evidence} / ${item.status}`),
      '',
      '3. 이번 주 주요 이슈',
      `- 막힌 항목: ${selectedItem.blocker}`,
      `- 다음 액션: ${selectedItem.nextAction}`,
      '',
      '4. 마감/종결 확인',
      ...(closeReady.length ? closeReady.slice(0, 3).map((item) => `- ${item.task} (${item.owner}, ${item.due}, ${item.status})`) : ['- 마감 대기 업무 없음']),
    ].join('\n');
  }

  if (kind === 'support') {
    return [
      `[${reportTemplates[kind]}]`,
      '',
      '1. 신청/수행 중 지원사업',
      ...(supportItems.length ? supportItems.map((item) => `- ${item.project}: ${item.task} / ${item.status} / 마감 ${item.due}`) : ['- 현재 등록된 지원사업 업무 없음']),
      '',
      '2. 필수 확인 항목',
      '- 공고문 지원 요건 확인',
      '- 사업계획서 및 신청서 초안',
      '- 참여기관/공급업체 요청자료',
      '- 재무/인력/장비 증빙',
      '- 사후조사 및 연계사업 가능성',
    ].join('\n');
  }

  if (kind === 'ip') {
    return [
      `[${reportTemplates[kind]}]`,
      '',
      '1. 특허/IP 일정',
      ...(ipItems.length ? ipItems.map((item) => `- ${item.task}: ${item.stage} / ${item.institution} / 마감 ${item.due}`) : ['- 현재 등록된 IP 업무 없음']),
      '',
      '2. 확인 및 보완',
      ...ipItems.map((item) => `- ${item.project}: ${item.evidenceNeed}, ${item.blocker}`),
      '',
      '3. 다음 액션',
      '- 명세서 검토 의견 취합',
      '- 선행기술/실험 근거 보완',
      '- OA/연차료 기한 캘린더 반영',
    ].join('\n');
  }

  return [
    `[${reportTemplates.weekly}] 2026.06.08 ~ 2026.06.14`,
    '',
    '1. 이번 주 핵심 진행',
    ...items.slice(0, 5).map((item) => `- ${item.project}: ${item.task} (${item.stage} / ${item.status}, ${item.owner})`),
    '',
    '2. 마감 임박',
    ...(dueSoon.length ? dueSoon.map((item) => `- ${item.due} ${item.task} / ${item.evidenceNeed}`) : ['- 7일 이내 마감 없음']),
    '',
    '3. 확인 필요 항목',
    ...(highRisk.length ? highRisk.map((item) => `- ${item.task}: ${item.blocker}`) : ['- 확인 필요 항목 없음']),
    '',
    '4. 다음 주 마감 확인',
    ...(closeReady.length ? closeReady.slice(0, 4).map((item) => `- ${item.task} (${item.status})`) : ['- 마감 대기 업무 없음']),
  ].join('\n');
}

class RenderErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <section className="module-table-panel render-error-panel">
          <div className="section-heading">
            <div>
              <h3>화면 표시 오류</h3>
              <p>{this.state.error.message}</p>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

function WorkloadMatrixPanel({
  title,
  subtitle,
  data,
  variant = 'console',
  action,
  onMemberClick,
}) {
  const gridTemplateColumns = `128px repeat(${data.columns.length}, minmax(78px, 1fr)) 72px`;
  const minWidth = 128 + data.columns.length * 78 + 72;
  const wrapperClassName = variant === 'module' ? 'module-table-panel workload-panel module-workload-panel' : 'panel workload-panel';
  const headerClassName = variant === 'module' ? 'section-heading workload-section-heading' : 'panel-header';

  return (
    <div className={wrapperClassName}>
      <div className={headerClassName}>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {action}
      </div>
      <div className="workload-summary-strip">
        <article>
          <span>총 업무량</span>
          <strong>{formatWorkloadValue(data.total)}건</strong>
        </article>
        <article>
          <span>집중 담당자</span>
          <strong>{data.topMember ? data.topMember.name : '-'}</strong>
        </article>
        <article>
          <span>집중 영역</span>
          <strong>{data.topColumn ? data.topColumn.label : '-'}</strong>
        </article>
      </div>
      <div className="workload-table">
        <div className="workload-header" style={{ gridTemplateColumns, minWidth }}>
          <span>담당자</span>
          {data.columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
          <span>합계</span>
        </div>
        {data.rows.map((row) => (
          <button
            key={row.name}
            className="workload-row"
            onClick={() => onMemberClick?.(row.name)}
            style={{ gridTemplateColumns, minWidth }}
            type="button"
          >
            <span className="member-cell">
              <span className={`mini-avatar ${row.color}`}>{row.short}</span>
              {row.name}
            </span>
            {row.values.map((value, index) => (
              <span className={`heat ${heatClassName(value)}`} key={`${row.name}-${data.columns[index]}`}>
                {formatWorkloadValue(value)}
              </span>
            ))}
            <strong>{formatWorkloadValue(row.total)}</strong>
          </button>
        ))}
        <div className="workload-column-total" style={{ gridTemplateColumns, minWidth }}>
          <span>범주 합계</span>
          {data.columnTotals.map((value, index) => (
            <strong key={`${data.columns[index]}-total`}>{formatWorkloadValue(value)}</strong>
          ))}
          <strong>{formatWorkloadValue(data.total)}</strong>
        </div>
      </div>
    </div>
  );
}

const chatPromptTemplates = [
  {
    id: 'proposal',
    label: '계획서 보완',
    prompt: '선택한 업무와 과제 정보를 기준으로 연구개발과제 계획서에 바로 붙여 넣을 수 있는 보완 문안을 작성해주세요. 목표, 필요성, 수행내용, 기대효과를 구분해주세요.',
  },
  {
    id: 'weekly',
    label: '주간 보고',
    prompt: '선택한 업무의 현재 상태를 주간 업무보고 형식으로 정리해주세요. 진행 내용, 이번 주 처리사항, 다음 액션, 확인이 필요한 항목을 구분해주세요.',
  },
  {
    id: 'test',
    label: '시험 의뢰',
    prompt: '선택한 업무를 기준으로 시험·분석 의뢰 목적, 요청 항목, 시료 설명, 결과 활용 방안을 외부기관에 전달할 문장으로 작성해주세요.',
  },
  {
    id: 'ip',
    label: '특허 문안',
    prompt: '선택한 업무를 기준으로 특허 검토 메모를 작성해주세요. 발명의 핵심, 차별점, 실험 근거, 명세서 보완 포인트를 구분해주세요.',
  },
  {
    id: 'check',
    label: '누락 점검',
    prompt: '선택한 업무를 종결하거나 다음 단계로 넘기기 전에 누락되기 쉬운 자료, 일정, 담당자 확인사항을 체크리스트로 작성해주세요.',
  },
];

function compactTextList(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(', ');
  return value || '-';
}

function buildChatGptContextText(item, projects, relatedItems, activeUserName) {
  const project = projects.find((entry) => entry.name === item?.project || entry.id === item?.projectId);
  const relatedSummary = relatedItems
    .slice(0, 8)
    .map((entry) => `- ${entry.type} / ${entry.task} / ${entry.owner} / ${entry.status} / ${entry.due}`)
    .join('\n');

  return [
    `사용자: ${activeUserName}`,
    '',
    '[선택 업무]',
    `구분: ${item?.type ?? '-'}`,
    `과제/사업명: ${item?.project ?? '-'}`,
    `업무명: ${item?.task ?? '-'}`,
    `담당자: ${item?.owner ?? '-'}`,
    `공동 담당: ${item?.coOwner ?? '-'}`,
    `단계: ${item?.stage ?? '-'}`,
    `상태: ${item?.status ?? '-'}`,
    `마감일: ${item?.due ?? '-'}`,
    `증빙: ${compactTextList(item?.evidence)}`,
    `필요 증빙: ${item?.evidenceNeed ?? '-'}`,
    `관련 기관: ${item?.institution ?? '-'}`,
    `메모: ${item?.memo ?? '-'}`,
    `다음 액션: ${item?.nextAction ?? '-'}`,
    '',
    '[과제 정보]',
    `진행 상태: ${project?.status ?? '-'}`,
    `주무부처: ${project?.ministry ?? '-'}`,
    `전문기관: ${project?.agency ?? '-'}`,
    `사업명: ${project?.program ?? '-'}`,
    `과제번호: ${project?.projectNo ?? '-'}`,
    `연구책임자: ${project?.director ?? '-'}`,
    `수행기간: ${project?.period ?? '-'}`,
    `주관기관: ${project?.leadOrg ?? '-'}`,
    `공동기관: ${project?.jointOrg ?? compactTextList(project?.jointOrgs)}`,
    `현재 중점 사항: ${project?.focus ?? '-'}`,
    '',
    '[같은 과제의 관련 업무]',
    relatedSummary || '-',
  ].join('\n');
}

function ChatGptSupportPanel({ workItems, selectedItem, projectPortfolioItems, storageConfig, activeUserName, setToast }) {
  const initialContextId = selectedItem?.id ?? workItems[0]?.id ?? '';
  const [selectedContextId, setSelectedContextId] = useState(initialContextId);
  const [prompt, setPrompt] = useState('');
  const [isSending, setSending] = useState(false);
  const [model, setModel] = useState(window.RD_OPS_CONFIG?.openaiModel ?? 'gpt-5.5-pro');
  const [messages, setMessages] = useState([
    {
      id: 'chatgpt-welcome',
      role: 'assistant',
      content: '업무를 선택하고 질문을 입력하면 선택 업무와 과제 정보를 함께 반영해 초안을 작성합니다.',
      createdAt: 'ready',
    },
  ]);

  useEffect(() => {
    if (selectedItem?.id) setSelectedContextId(selectedItem.id);
  }, [selectedItem?.id]);

  const contextOptions = useMemo(() => {
    const rows = [selectedItem, ...workItems].filter(Boolean);
    return Array.from(new Map(rows.map((item) => [item.id, item])).values());
  }, [selectedItem, workItems]);
  const contextItem = contextOptions.find((item) => item.id === selectedContextId) ?? contextOptions[0];
  const relatedItems = useMemo(
    () => workItems.filter((item) => item.project === contextItem?.project || item.id === contextItem?.id),
    [contextItem, workItems]
  );
  const isProxyReady = storageConfig?.mode === 'google-drive' && Boolean(storageConfig?.url);
  const selectedProject = projectPortfolioItems.find((project) => project.name === contextItem?.project || project.id === contextItem?.projectId);
  const dueLabel = contextItem?.due ? `${contextItem.due}${daysLeft(contextItem.due) >= 0 ? ` · D-${daysLeft(contextItem.due)}` : ' · 경과'}` : '-';

  async function submitPrompt(nextPrompt = prompt) {
    const text = String(nextPrompt ?? '').trim();
    if (!text) {
      setToast('질문 내용을 입력해주세요.');
      return;
    }
    if (!isProxyReady) {
      setToast('Google Apps Script 연결 후 ChatGPT 업무지원이 동작합니다.');
      setMessages((state) => [
        ...state,
        {
          id: `chatgpt-config-${Date.now()}`,
          role: 'assistant',
          content: '현재 저장소 설정이 Google Apps Script 모드가 아니어서 OpenAI API 프록시를 호출할 수 없습니다.',
          createdAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      return;
    }

    const createdAt = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    setMessages((state) => [...state, { id: `chatgpt-user-${Date.now()}`, role: 'user', content: text, createdAt }]);
    setPrompt('');
    setSending(true);

    try {
      const payload = {
        prompt: text,
        context: buildChatGptContextText(contextItem, projectPortfolioItems, relatedItems, activeUserName),
        model: model.trim() || 'gpt-5.5-pro',
        user: activeUserName,
      };
      const result = await requestChatGptSupport(storageConfig.url, payload);
      if (!result?.ok) throw new Error(result?.error || 'ChatGPT 응답을 가져오지 못했습니다.');
      setMessages((state) => [
        ...state,
        {
          id: `chatgpt-assistant-${Date.now()}`,
          role: 'assistant',
          content: result.answer || '응답 본문이 비어 있습니다.',
          createdAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (error) {
      setMessages((state) => [
        ...state,
        {
          id: `chatgpt-error-${Date.now()}`,
          role: 'assistant',
          content: `요청 처리 중 오류가 발생했습니다: ${error.message}`,
          createdAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chatgpt-workspace">
      <section className="chatgpt-command-panel">
        <div className="chatgpt-command-head">
          <div>
            <span className="chatgpt-kicker">AI WORKBENCH</span>
            <h3>업무 문서 초안 작업대</h3>
            <p>{contextItem?.project ?? '과제 선택'} · {contextItem?.task ?? '업무 선택'}</p>
          </div>
          <div className="chatgpt-head-actions">
            <span className={`chatgpt-connection ${isProxyReady ? 'online' : 'offline'}`}>{isProxyReady ? '연동 가능' : '연동 대기'}</span>
            <button onClick={() => setMessages([])} type="button">
              <RefreshCw size={14} />
              초기화
            </button>
          </div>
        </div>

        <div className="chatgpt-control-strip">
          <label>
            <span>업무 컨텍스트</span>
            <select value={contextItem?.id ?? ''} onChange={(event) => setSelectedContextId(event.target.value)}>
              {contextOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.project} / {item.task}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>모델</span>
            <input value={model} onChange={(event) => setModel(event.target.value)} />
          </label>
        </div>

        <div className="chatgpt-template-row">
          {chatPromptTemplates.map((template) => (
            <button key={template.id} onClick={() => submitPrompt(template.prompt)} type="button" disabled={isSending}>
              <span>{template.label}</span>
              <strong>실행</strong>
            </button>
          ))}
        </div>

        <div className="chatgpt-canvas">
          <div className="chatgpt-canvas-head">
            <div>
              <span>Draft Stream</span>
              <strong>{messages.length}개 기록</strong>
            </div>
            <span>{activeUserName}</span>
          </div>
          <div className="chatgpt-messages">
            {messages.length ? messages.map((message) => (
              <article className={`chatgpt-message ${message.role}`} key={message.id}>
                <div>
                  <strong>{message.role === 'user' ? activeUserName : 'ChatGPT 업무지원'}</strong>
                  <span>{message.createdAt}</span>
                </div>
                <p>{message.content}</p>
              </article>
            )) : (
              <div className="chatgpt-empty-state">
                <FileText size={18} />
                <span>질문 또는 프리셋 실행 대기</span>
              </div>
            )}
            {isSending ? (
              <article className="chatgpt-message assistant loading">
                <div>
                  <strong>ChatGPT 업무지원</strong>
                  <span>작성 중</span>
                </div>
                <p>선택 업무와 과제 정보를 반영해 초안을 작성하고 있습니다.</p>
              </article>
            ) : null}
          </div>
        </div>

        <div className="chatgpt-composer">
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="예: 이 업무를 기준으로 연차보고서의 추진현황 문단을 작성해줘."
            onKeyDown={(event) => {
              if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') submitPrompt();
            }}
          />
          <button className="primary-action" onClick={() => submitPrompt()} type="button" disabled={isSending}>
            <MessageSquareText size={16} />
            전송
          </button>
        </div>
      </section>

      <aside className="chatgpt-side">
        <section className="chatgpt-dossier-panel">
          <div className="chatgpt-dossier-head">
            <div>
              <span>{contextItem?.type ?? '-'}</span>
              <h3>연결 업무</h3>
              <p>{contextItem?.task ?? '-'}</p>
            </div>
            <strong>{contextItem?.status ?? '-'}</strong>
          </div>

          <div className="chatgpt-fact-grid">
            <article>
              <span>담당자</span>
              <strong>{contextItem?.owner ?? '-'}</strong>
            </article>
            <article>
              <span>마감</span>
              <strong>{dueLabel}</strong>
            </article>
            <article>
              <span>전문기관</span>
              <strong>{selectedProject?.agency ?? contextItem?.institution ?? '-'}</strong>
            </article>
            <article>
              <span>증빙</span>
              <strong>{compactTextList(contextItem?.evidence)}</strong>
            </article>
          </div>

          <div className="chatgpt-note-block">
            <span>중점 메모</span>
            <p>{contextItem?.memo ?? selectedProject?.focus ?? '-'}</p>
          </div>
        </section>

        <section className="chatgpt-side-panel">
          <div className="chatgpt-side-head">
            <div>
              <h3>관련 업무</h3>
              <span>{relatedItems.length}건</span>
            </div>
          </div>
          <div className="chatgpt-related-list">
            {relatedItems.slice(0, 5).map((item) => (
              <article key={item.id}>
                <span>{item.type}</span>
                <strong>{item.task}</strong>
                <em>{item.owner} · {item.due}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="chatgpt-side-panel">
          <div className="chatgpt-side-head">
            <div>
              <h3>연동 상태</h3>
              <span>{model || 'gpt-5.5-pro'}</span>
            </div>
          </div>
          <div className="chatgpt-status-grid">
            <span className={isProxyReady ? 'online' : 'offline'}>{isProxyReady ? 'Google Apps Script 연결됨' : 'Google Apps Script 설정 필요'}</span>
            <span>API Key: 프론트엔드 미저장</span>
          </div>
        </section>
      </aside>
    </div>
  );
}

function ModuleWorkspace({
  activeNav,
  config,
  workItems,
  workloadItems,
  testInstitutions,
  selectedTestInstitutionId,
  testInstitutionDraft,
  onSelectTestInstitution,
  onUpdateTestInstitutionRow,
  onUpdateTestInstitutionDraft,
  onSaveTestInstitution,
  onAddTestInstitution,
  onDeleteTestInstitution,
  onDeleteTestInstitutions,
  patents,
  selectedPatentId,
  patentDraft,
  onSelectPatent,
  onUpdatePatentDraft,
  onSavePatent,
  onAddPatent,
  onDeletePatents,
  budgetRows,
  budgetProjectFilter,
  budgetYearFilter,
  selectedBudgetId,
  budgetDraft,
  onBudgetProjectFilterChange,
  onBudgetYearFilterChange,
  onSelectBudgetRow,
  onUpdateBudgetDraft,
  onSaveBudgetRow,
  onAddBudgetRow,
  onDeleteBudgetRows,
  teamCheckins,
  projectPortfolioItems,
  projectTargetRows,
  selectedPortfolioId,
  onSelectPortfolio,
  onUpdatePortfolioItem,
  onAddPortfolioProject,
  onDeletePortfolioProject,
  onDeletePortfolioProjects,
  onOpenPortfolioEdit,
  executionPlans,
  selectedExecutionProjectId,
  onSelectExecutionProject,
  onUpdateExecutionMonth,
  onSaveSchedule,
  onDeleteSchedule,
  onDeleteSchedules,
  onAddExecutionTask,
  onSaveWorkItem,
  equipmentItems,
  selectedEquipmentId,
  onSelectEquipment,
  onUpdateEquipmentItem,
  onUpdateEquipmentQuote,
  onUpdateEquipmentSpec,
  onRenameEquipmentSpec,
  onAddEquipmentSpec,
  onAddEquipment,
  onDeleteEquipmentItems,
  testRequestItems,
  selectedTestRequestId,
  onSelectTestRequest,
  onUpdateTestRequest,
  onAddTestRequest,
  onSaveTestRequest,
  onDeleteTestRequests,
  royaltyRows,
  onAddRoyaltyRow,
  onSaveRoyaltyRow,
  onDeleteRoyaltyRows,
  labAdminRows,
  onAddLabAdminRow,
  onSaveLabAdminRow,
  onDeleteLabAdminRows,
  checkinDraft,
  updateCheckinDraft,
  submitTeamCheckin,
  advanceCheckinStatus,
  selectedItem,
  sharedStorageConfig,
  activeUserName,
  chooseItem,
  onCompleteItem,
  onDeleteWorkItems,
  onExportCsv,
  onOpenModuleInput,
  setFilters,
  setToast,
  onOpenMember,
}) {
  const items = workItems.filter((item) => config.types.includes(item.type));
  const isPortfolio = activeNav === 'portfolio';
  const isExecution = activeNav === 'execution';
  const isTeam = activeNav === 'team';
  const isTest = activeNav === 'test';
  const isIp = activeNav === 'ip';
  const isBudget = activeNav === 'budget';
  const isOutcome = activeNav === 'outcome';
  const isLabAdmin = activeNav === 'labadmin';
  const isChatGpt = activeNav === 'chatgpt';
  const moduleWorkloadSpec = workloadModuleSpecs[activeNav];
  const moduleWorkloadData = moduleWorkloadSpec ? buildWorkloadMatrix(workloadItems, moduleWorkloadSpec) : null;

  return (
    <section className="module-single-panel">
      {isPortfolio ? (
        <ProjectPortfolioPanel
          projects={projectPortfolioItems}
          targets={projectTargetRows}
          selectedId={selectedPortfolioId}
          onSelect={onSelectPortfolio}
          onUpdateProject={onUpdatePortfolioItem}
          onAddProject={onAddPortfolioProject}
          onDeleteProject={onDeletePortfolioProject}
          onDeleteProjects={onDeletePortfolioProjects}
          onExportCsv={onExportCsv}
          setToast={setToast}
          onOpenEdit={onOpenPortfolioEdit}
        />
      ) : isExecution ? (
        <ProjectExecutionPanel
          projects={projectPortfolioItems}
          plans={executionPlans}
          items={items}
          selectedProjectId={selectedExecutionProjectId}
          onSelectProject={onSelectExecutionProject}
          onUpdateMonth={onUpdateExecutionMonth}
          onSaveSchedule={onSaveSchedule}
          onDeleteSchedule={onDeleteSchedule}
          onDeleteSchedules={onDeleteSchedules}
          onAddTask={onAddExecutionTask}
          onSaveTask={onSaveWorkItem}
          onDeleteTasks={onDeleteWorkItems}
          chooseItem={chooseItem}
          onExportCsv={onExportCsv}
          setToast={setToast}
        />
      ) : isTeam ? (
        <TeamInputPanel
          items={items}
          teamCheckins={teamCheckins}
          checkinDraft={checkinDraft}
          updateCheckinDraft={updateCheckinDraft}
          submitTeamCheckin={submitTeamCheckin}
          advanceCheckinStatus={advanceCheckinStatus}
          chooseItem={chooseItem}
          setFilters={setFilters}
          setToast={setToast}
          onOpenMember={onOpenMember}
        />
      ) : isTest ? (
        <TestInstitutionPanel
          institutions={testInstitutions}
          selectedId={selectedTestInstitutionId}
          draft={testInstitutionDraft}
          onSelect={onSelectTestInstitution}
          onUpdateRow={onUpdateTestInstitutionRow}
          onUpdateDraft={onUpdateTestInstitutionDraft}
          onAddNew={onAddTestInstitution}
          onDelete={onDeleteTestInstitution}
          onDeleteMany={onDeleteTestInstitutions}
          onExportCsv={() => onExportCsv('시험의뢰기관목록.csv', testInstitutionCsvColumns, testInstitutions)}
          requests={testRequestItems}
          selectedRequestId={selectedTestRequestId}
          onSelectRequest={onSelectTestRequest}
          onUpdateRequest={onUpdateTestRequest}
          onAddRequest={onAddTestRequest}
          onSaveRequest={onSaveTestRequest}
          onDeleteRequests={onDeleteTestRequests}
          setToast={setToast}
        />
      ) : isIp ? (
        <PatentPortfolioPanel
          patents={patents}
          tasks={items}
          selectedId={selectedPatentId}
          draft={patentDraft}
          onSelect={onSelectPatent}
          onUpdateDraft={onUpdatePatentDraft}
          onSave={onSavePatent}
          onAddNew={onAddPatent}
          onDeletePatents={onDeletePatents}
          onAddTask={onOpenModuleInput}
          onSaveTask={onSaveWorkItem}
          onDeleteTasks={onDeleteWorkItems}
          chooseItem={chooseItem}
          onCompleteItem={onCompleteItem}
          onExportCsv={() => onExportCsv('특허보유현황.csv', patentCsvColumns, patents)}
          setToast={setToast}
        />
      ) : isBudget ? (
        <BudgetOverviewPanel
          rows={budgetRows}
          projectFilter={budgetProjectFilter}
          yearFilter={budgetYearFilter}
          selectedId={selectedBudgetId}
          draft={budgetDraft}
          onProjectFilterChange={onBudgetProjectFilterChange}
          onYearFilterChange={onBudgetYearFilterChange}
          onSelect={onSelectBudgetRow}
          onUpdateDraft={onUpdateBudgetDraft}
          onSave={onSaveBudgetRow}
          onAddNew={onAddBudgetRow}
          onDeleteBudgetRows={onDeleteBudgetRows}
          onExportCsv={onExportCsv}
          equipmentItems={equipmentItems}
          selectedEquipmentId={selectedEquipmentId}
          onSelectEquipment={onSelectEquipment}
          onUpdateEquipmentItem={onUpdateEquipmentItem}
          onUpdateEquipmentQuote={onUpdateEquipmentQuote}
          onUpdateEquipmentSpec={onUpdateEquipmentSpec}
          onRenameEquipmentSpec={onRenameEquipmentSpec}
          onAddEquipmentSpec={onAddEquipmentSpec}
          onAddEquipment={onAddEquipment}
          onDeleteEquipmentItems={onDeleteEquipmentItems}
        />
      ) : isOutcome ? (
        <OutcomeRoyaltyTable rows={royaltyRows} onAddRow={onAddRoyaltyRow} onSaveRow={onSaveRoyaltyRow} onDeleteRows={onDeleteRoyaltyRows} onExportCsv={onExportCsv} />
      ) : isLabAdmin ? (
        <LabAdminTable rows={labAdminRows} onAddRow={onAddLabAdminRow} onSaveRow={onSaveLabAdminRow} onDeleteRows={onDeleteLabAdminRows} onExportCsv={onExportCsv} />
      ) : isChatGpt ? (
        <ChatGptSupportPanel
          workItems={workItems}
          selectedItem={selectedItem}
          projectPortfolioItems={projectPortfolioItems}
          storageConfig={sharedStorageConfig}
          activeUserName={activeUserName}
          setToast={setToast}
        />
      ) : (
        <ModuleRegister activeNav={activeNav} items={items} chooseItem={chooseItem} onCompleteItem={onCompleteItem} onDeleteItems={onDeleteWorkItems} onSaveItem={onSaveWorkItem} onExportCsv={onExportCsv} onAddNew={onOpenModuleInput} setToast={setToast} />
      )}
      {moduleWorkloadData ? (
        <WorkloadMatrixPanel
          title={moduleWorkloadSpec.title}
          subtitle={moduleWorkloadSpec.subtitle}
          data={moduleWorkloadData}
          variant="module"
          onMemberClick={(name) => setFilters((state) => ({ ...state, owner: name }))}
        />
      ) : null}
    </section>
  );
}

function buildProjectTargetDisplayRows(project, targets) {
  const rowsByKey = new Map();
  (project.yearlyQuantTargets ?? []).forEach((target) => {
    const key = `${target.goal}-${target.unit}-${target.note ?? ''}`;
    const current = rowsByKey.get(key) ?? { id: key, goal: target.goal, unit: target.unit, year1: '-', year2: '-', year3: '-', note: target.note ?? '' };
    if (target.year === '1차년도') current.year1 = target.target;
    if (target.year === '2차년도') current.year2 = target.target;
    if (target.year === '3차년도') current.year3 = target.target;
    rowsByKey.set(key, current);
  });
  const additionalRows = targets.map((row) => ({
    id: row.id,
    goal: row.goal,
    unit: row.unit,
    year1: row.year1 || '-',
    year2: row.year2 || '-',
    year3: row.year3 || '-',
    note: row.note || '추가 목표',
  }));
  return [...rowsByKey.values(), ...additionalRows];
}

function ProjectPortfolioPanel({ projects, targets, selectedId, onSelect, onUpdateProject, onAddProject, onDeleteProject, onDeleteProjects, onExportCsv, setToast, onOpenEdit }) {
  const selectedProject = projects.find((project) => project.id === selectedId) ?? projects[0];
  const projectSelection = useRowSelection(projects);
  const targetRows = targets.filter((target) => target.projectId === selectedProject.id);
  const displayTargetRows = buildProjectTargetDisplayRows(selectedProject, targetRows);
  const jointOrgs = toList(selectedProject.jointOrgs?.length ? selectedProject.jointOrgs : selectedProject.jointOrg);
  const consignedOrgs = toList(selectedProject.consignedOrgs?.length ? selectedProject.consignedOrgs : selectedProject.consignedOrg);
  const contacts = toList(selectedProject.contactRows?.length ? selectedProject.contactRows : selectedProject.contacts);
  const researchRows = toList(selectedProject.yearlyResearchRows?.length ? selectedProject.yearlyResearchRows : selectedProject.yearlyResearch);

  return (
    <div className="portfolio-layout">
      <section className="module-table-panel">
        <div className="section-heading">
          <div>
            <h3>과제 목록</h3>
            <p>과제 계획서와 중심 내용을 확인하는 포트폴리오 대장입니다.</p>
          </div>
          <div className="section-actions">
            <button onClick={() => onExportCsv('과제포트폴리오.csv', projectPortfolioCsvColumns, projects)} type="button">
              <Download size={14} />
              CSV
            </button>
            <button onClick={onAddProject} type="button">
              <Plus size={14} />
              과제 등록
            </button>
            <DeleteSelectedButton
              count={projectSelection.selectedCount}
              onClick={() => {
                onDeleteProjects(projectSelection.selectedIds);
                projectSelection.clear();
              }}
            />
          </div>
        </div>
        <div className="data-table-shell">
          <table className="data-table project-portfolio-table">
            <thead>
              <tr>
                <SelectionHeader label="과제 목록" selection={projectSelection} />
                <th>진행 상태</th>
                <th>주무부처</th>
                <th>전문기관</th>
                <th>사업명</th>
                <th>과제번호</th>
                <th>과제명</th>
                <th>연구책임자</th>
                <th>수행기간</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className={selectedId === project.id ? 'selected' : ''} onClick={() => onSelect(project.id)}>
                  <SelectionCell
                    checked={projectSelection.isSelected(project.id)}
                    label={`${project.name} 선택`}
                    onChange={() => projectSelection.toggleRow(project.id)}
                  />
                  <td><span className="stage-chip">{project.status}</span></td>
                  <td>{project.ministry}</td>
                  <td>{project.agency}</td>
                  <td>{project.program}</td>
                  <td>{project.projectNo}</td>
                  <td className="strong-cell">{project.name}</td>
                  <td>{project.director}</td>
                  <td>{project.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="portfolio-detail-grid">
        <article className="fixed-info-panel">
          <div className="fixed-info-head">
            <div>
              <span className="stage-chip">{selectedProject.status}</span>
              <h4>{selectedProject.name}</h4>
              <p>{selectedProject.program} · {selectedProject.projectNo}</p>
            </div>
            <button onClick={() => onOpenEdit(selectedProject.id)} type="button">정보 입력</button>
          </div>

          <div className="fixed-info-grid">
            <article>
              <span>주관연구개발기관</span>
              <strong>{selectedProject.leadOrg || '-'}</strong>
            </article>
            <article>
              <span>수행기간</span>
              <strong>{selectedProject.period || '-'}</strong>
            </article>
            <article>
              <span>주무부처 / 전문기관</span>
              <strong>{selectedProject.ministry} / {selectedProject.agency}</strong>
            </article>
            <article>
              <span>연구책임자</span>
              <strong>{selectedProject.director || '-'}</strong>
            </article>
          </div>

          <div className="fixed-section">
            <h5>공동연구개발기관</h5>
            <div className="info-chip-list">
              {jointOrgs.length ? jointOrgs.map((org) => <span key={org}>{org}</span>) : <span>등록 없음</span>}
            </div>
          </div>

          <div className="fixed-section">
            <h5>위탁연구개발기관</h5>
            <div className="info-chip-list">
              {consignedOrgs.length ? consignedOrgs.map((org) => <span key={org}>{org}</span>) : <span>등록 없음</span>}
            </div>
          </div>

          <div className="fixed-section">
            <h5>사업 담당자 연락처</h5>
            <div className="info-list">
              {contacts.length ? contacts.map((contact) => <span key={contact}>{contact}</span>) : <span>등록 없음</span>}
            </div>
          </div>

          <div className="fixed-section">
            <h5>연차별 주요 연구내용</h5>
            <div className="info-list">
              {researchRows.length ? researchRows.map((row) => <span key={row}>{row}</span>) : <span>등록 없음</span>}
            </div>
          </div>

          <div className="fixed-section">
            <h5>현재 중점 사항</h5>
            <p>{selectedProject.focus || '등록 없음'}</p>
          </div>

          <div className="fixed-section">
            <h5>첨부</h5>
            <div className="evidence-list">
              {(selectedProject.attachments ?? []).length ? selectedProject.attachments.map((file) => (
                <span key={file}><FileText size={14} />{file}</span>
              )) : <p>등록된 첨부가 없습니다.</p>}
            </div>
          </div>

          <div className="button-row">
            <button className="danger-button" onClick={() => onDeleteProject(selectedProject.id)} type="button">선택 과제 삭제</button>
            <button className="secondary-action stretch" onClick={() => setToast('선택 과제의 포트폴리오 정보를 확인했습니다.')} type="button">확인</button>
          </div>
        </article>

        <article className="module-table-panel">
          <div className="section-heading">
            <div>
              <h3>과제별 정량목표</h3>
              <p>연차별 정량 목표와 추가 목표를 합쳐 고정 표로 확인합니다.</p>
            </div>
            <button onClick={() => onExportCsv('과제별정량목표.csv', projectTargetCsvColumns, displayTargetRows)} type="button">
              <Download size={14} />
              CSV
            </button>
          </div>
          <div className="data-table-shell">
            <table className="data-table target-table">
              <thead>
                <tr>
                  <th>목표</th>
                  <th>단위</th>
                  <th>1차년도</th>
                  <th>2차년도</th>
                  <th>3차년도</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                {displayTargetRows.map((row) => (
                  <tr key={row.id}>
                    <td className="strong-cell">{row.goal}</td>
                    <td>{row.unit}</td>
                    <td>{row.year1}</td>
                    <td>{row.year2}</td>
                    <td>{row.year3}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
}

function PortfolioEditModal({ project, targets, onSave, onClose }) {
  const [draft, setDraft] = useState(() => ({
    ...project,
    jointOrgs: toList(project.jointOrgs?.length ? project.jointOrgs : project.jointOrg),
    consignedOrgs: toList(project.consignedOrgs?.length ? project.consignedOrgs : project.consignedOrg),
    contactRows: toList(project.contactRows?.length ? project.contactRows : project.contacts),
    yearlyResearchRows: toList(project.yearlyResearchRows?.length ? project.yearlyResearchRows : project.yearlyResearch),
    yearlyQuantTargets: project.yearlyQuantTargets?.length ? project.yearlyQuantTargets : [],
    attachments: project.attachments ?? [],
  }));
  const [targetDrafts, setTargetDrafts] = useState(() => targets.map((row) => ({ ...row })));
  const [activeSection, setActiveSection] = useState('basic');
  const editSections = [
    { key: 'basic', label: '기본 정보' },
    { key: 'orgs', label: '기관·연락처' },
    { key: 'targets', label: '목표' },
    { key: 'attachments', label: '첨부' },
  ];

  function updateDraft(field, value) {
    setDraft((state) => ({ ...state, [field]: value }));
  }

  function updateList(field, index, value) {
    setDraft((state) => ({
      ...state,
      [field]: state[field].map((item, itemIndex) => (itemIndex === index ? value : item)),
    }));
  }

  function addListItem(field, value = '') {
    setDraft((state) => ({ ...state, [field]: [...state[field], value] }));
  }

  function removeListItem(field, index) {
    setDraft((state) => ({ ...state, [field]: state[field].filter((_, itemIndex) => itemIndex !== index) }));
  }

  function updateYearlyTarget(index, field, value) {
    setDraft((state) => ({
      ...state,
      yearlyQuantTargets: state.yearlyQuantTargets.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)),
    }));
  }

  function addYearlyTarget() {
    setDraft((state) => ({
      ...state,
      yearlyQuantTargets: [
        ...state.yearlyQuantTargets,
        { id: `YQT-${Date.now()}`, goal: '', unit: '', year: '1차년도', target: '', note: '' },
      ],
    }));
  }

  function removeYearlyTarget(index) {
    setDraft((state) => ({ ...state, yearlyQuantTargets: state.yearlyQuantTargets.filter((_, itemIndex) => itemIndex !== index) }));
  }

  function updateTargetDraft(index, field, value) {
    setTargetDrafts((rows) => rows.map((row, rowIndex) => (rowIndex === index ? { ...row, [field]: value } : row)));
  }

  function addTargetDraft() {
    setTargetDrafts((rows) => [...rows, { id: `TGT-${Date.now()}`, projectId: draft.id, goal: '', unit: '', year1: '', year2: '', year3: '', note: '추가 목표' }]);
  }

  function save() {
    const normalized = {
      ...draft,
      jointOrg: draft.jointOrgs.join(', '),
      consignedOrg: draft.consignedOrgs.join(', '),
      contacts: draft.contactRows.join('\n'),
      yearlyResearch: draft.yearlyResearchRows.join('\n'),
      yearlyTargets: draft.yearlyQuantTargets.map((target) => `${target.year} ${target.goal} ${target.target}${target.unit ? ` ${target.unit}` : ''}`).join('\n'),
    };
    onSave(normalized, targetDrafts.filter((row) => row.goal.trim()));
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal portfolio-edit-modal" role="dialog" aria-modal="true" aria-labelledby="portfolio-edit-title">
        <div className="modal-header">
          <div>
            <h2 id="portfolio-edit-title">과제 포트폴리오 입력</h2>
            <p>저장하면 메인 화면에는 고정 정보로 표시됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>

        <div className="modal-tab-row" role="tablist" aria-label="과제 포트폴리오 입력 단계">
          {editSections.map((section) => (
            <button
              aria-selected={activeSection === section.key}
              className={activeSection === section.key ? 'active' : ''}
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              role="tab"
              type="button"
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="portfolio-edit-body">
          {activeSection === 'basic' && (
            <section className="data-entry-form portfolio-tab-panel">
              <h4>기본 정보</h4>
              <div className="form-grid compact">
                <label>진행 상태<input value={draft.status} onChange={(event) => updateDraft('status', event.target.value)} /></label>
                <label>주무부처<input value={draft.ministry} onChange={(event) => updateDraft('ministry', event.target.value)} /></label>
                <label>전문기관<input value={draft.agency} onChange={(event) => updateDraft('agency', event.target.value)} /></label>
                <label>사업명<input value={draft.program} onChange={(event) => updateDraft('program', event.target.value)} /></label>
                <label>과제번호<input value={draft.projectNo} onChange={(event) => updateDraft('projectNo', event.target.value)} /></label>
                <label>연구책임자<input value={draft.director} onChange={(event) => updateDraft('director', event.target.value)} /></label>
              </div>
              <label>과제명<input value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} /></label>
              <label>수행기간<input value={draft.period} onChange={(event) => updateDraft('period', event.target.value)} /></label>
              <label>주관연구개발기관<input value={draft.leadOrg} onChange={(event) => updateDraft('leadOrg', event.target.value)} /></label>
              <label>현재 중점 사항<textarea value={draft.focus} onChange={(event) => updateDraft('focus', event.target.value)} /></label>
            </section>
          )}

          {activeSection === 'orgs' && (
            <section className="data-entry-form portfolio-tab-panel">
              <h4>기관 / 연락처</h4>
              {[
                ['jointOrgs', '공동연구개발기관'],
                ['consignedOrgs', '위탁연구개발기관'],
                ['contactRows', '사업 담당자 연락처'],
                ['yearlyResearchRows', '연차별 주요 연구내용'],
              ].map(([field, label]) => (
                <div className="repeat-input-block" key={field}>
                  <div className="section-label">
                    {label}
                    <button onClick={() => addListItem(field)} type="button"><Plus size={13} />추가</button>
                  </div>
                  {draft[field].map((item, index) => (
                    <div className="repeat-input-row" key={`${field}-${index}`}>
                      <input value={item} onChange={(event) => updateList(field, index, event.target.value)} />
                      <button onClick={() => removeListItem(field, index)} type="button">삭제</button>
                    </div>
                  ))}
                  {!draft[field].length && <p className="empty-panel-copy">등록된 항목 없음</p>}
                </div>
              ))}
            </section>
          )}

          {activeSection === 'targets' && (
            <section className="data-entry-form portfolio-tab-panel">
              <div className="section-label">
                연차별 정량 목표
                <button onClick={addYearlyTarget} type="button"><Plus size={13} />목표 추가</button>
              </div>
              <div className="modal-table-shell">
                <table className="data-table modal-edit-table">
                  <thead>
                    <tr>
                      <th>목표</th>
                      <th>단위</th>
                      <th>연차</th>
                      <th>목표값</th>
                      <th>비고</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {draft.yearlyQuantTargets.map((row, index) => (
                      <tr key={row.id}>
                        <td><input className="cell-input" value={row.goal} onChange={(event) => updateYearlyTarget(index, 'goal', event.target.value)} /></td>
                        <td><input className="cell-input" value={row.unit} onChange={(event) => updateYearlyTarget(index, 'unit', event.target.value)} /></td>
                        <td>
                          <select className="cell-input" value={row.year} onChange={(event) => updateYearlyTarget(index, 'year', event.target.value)}>
                            <option>1차년도</option>
                            <option>2차년도</option>
                            <option>3차년도</option>
                          </select>
                        </td>
                        <td><input className="cell-input" value={row.target} onChange={(event) => updateYearlyTarget(index, 'target', event.target.value)} /></td>
                        <td><input className="cell-input" value={row.note} onChange={(event) => updateYearlyTarget(index, 'note', event.target.value)} /></td>
                        <td><button className="danger-button" onClick={() => removeYearlyTarget(index)} type="button">삭제</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="section-label">
                추가 목표
                <button onClick={addTargetDraft} type="button"><Plus size={13} />추가</button>
              </div>
              <div className="modal-table-shell">
                <table className="data-table modal-edit-table">
                  <thead>
                    <tr>
                      <th>목표</th>
                      <th>단위</th>
                      <th>1차년도</th>
                      <th>2차년도</th>
                      <th>3차년도</th>
                      <th>비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {targetDrafts.map((row, index) => (
                      <tr key={row.id}>
                        <td><input className="cell-input" value={row.goal} onChange={(event) => updateTargetDraft(index, 'goal', event.target.value)} /></td>
                        <td><input className="cell-input" value={row.unit} onChange={(event) => updateTargetDraft(index, 'unit', event.target.value)} /></td>
                        <td><input className="cell-input" value={row.year1} onChange={(event) => updateTargetDraft(index, 'year1', event.target.value)} /></td>
                        <td><input className="cell-input" value={row.year2} onChange={(event) => updateTargetDraft(index, 'year2', event.target.value)} /></td>
                        <td><input className="cell-input" value={row.year3} onChange={(event) => updateTargetDraft(index, 'year3', event.target.value)} /></td>
                        <td><input className="cell-input" value={row.note} onChange={(event) => updateTargetDraft(index, 'note', event.target.value)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeSection === 'attachments' && (
            <section className="data-entry-form portfolio-tab-panel">
              <FileAttachmentEditor
                files={draft.attachments}
                label="첨부"
                onChange={(files) => setDraft((current) => ({ ...current, attachments: files }))}
              />
              <div className="attachment-edit-list">
                {draft.attachments.map((file, index) => (
                  <div className="repeat-input-row" key={`${file}-${index}`}>
                    <input value={file} onChange={(event) => updateList('attachments', index, event.target.value)} />
                    <button onClick={() => removeListItem('attachments', index)} type="button">삭제</button>
                  </div>
                ))}
                {!draft.attachments.length && <p className="empty-panel-copy">등록된 첨부 없음</p>}
              </div>
            </section>
          )}
        </div>

        <div className="button-row modal-actions sticky-modal-actions">
          <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
          <button className="primary-action stretch" onClick={save} type="button">저장</button>
        </div>
      </section>
    </div>
  );
}

const executionMonths = [6, 7, 8, 9, 10, 11, 12];

function createEmptyScheduleItem() {
  return {
    id: `SCH-${Date.now()}`,
    category: '신규 수행 항목',
    title: '',
    startMonth: 6,
    endMonth: 8,
    owner: '김태현 과장',
    status: '계획',
    color: '#155eef',
  };
}

function normalizeScheduleItem(item) {
  const parsedMonth = Number(String(item.month ?? '').replace('월', '')) || 6;
  return {
    ...item,
    id: item.id ?? `SCH-${item.category ?? item.title ?? parsedMonth}`,
    category: item.category ?? item.title ?? '수행 항목',
    startMonth: Number(item.startMonth ?? parsedMonth),
    endMonth: Number(item.endMonth ?? item.startMonth ?? parsedMonth),
    color: item.color ?? '#155eef',
  };
}

function normalizeGoalRows(goals) {
  return (goals ?? []).map((goal, index) => (typeof goal === 'string'
    ? { id: `GOAL-${index}`, goal, metric: '-', due: '-', note: '-' }
    : goal));
}

function executionStatusGroup(item) {
  if (item.status === '종결' || item.stage === '종결' || item.status === '마감 대기') return '마감';
  if (['진행 중', '외부 협의', '보완 필요', '작성'].includes(item.status) || ['수행', '작성', '의뢰', '확인'].includes(item.stage)) return '진행 중';
  return '계획';
}

function ProjectExecutionPanel({
  projects,
  plans,
  items,
  selectedProjectId,
  onSelectProject,
  onSaveSchedule,
  onDeleteSchedule,
  onDeleteSchedules,
  onAddTask,
  onSaveTask,
  onDeleteTasks,
  chooseItem,
  onExportCsv,
  setToast,
}) {
  const [scheduleDraft, setScheduleDraft] = useState(null);
  const [taskEditDraft, setTaskEditDraft] = useState(null);
  const selectedPlan = plans.find((plan) => plan.projectId === selectedProjectId) ?? plans[0];
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];
  const projectTasks = items.filter((item) => item.project === selectedPlan.projectName);
  const scheduleRows = selectedPlan.monthly.map((item) => ({ project: selectedPlan.projectName, ...normalizeScheduleItem(item) }));
  const goalRows = normalizeGoalRows(selectedPlan.goals);
  const scheduleSelection = useRowSelection(scheduleRows);
  const taskSelection = useRowSelection(projectTasks);

  function openNewSchedule() {
    setScheduleDraft({ ...createEmptyScheduleItem(), owner: selectedProject.director ?? '김태현 과장' });
  }

  function openScheduleEdit(item) {
    setScheduleDraft({ ...item });
  }

  function saveScheduleDraft(event) {
    event.preventDefault();
    if (!scheduleDraft?.title?.trim()) return;
    onSaveSchedule(selectedPlan.projectId, scheduleDraft);
    setScheduleDraft(null);
  }

  function deleteScheduleDraft() {
    if (!scheduleDraft?.id) return;
    onDeleteSchedule(selectedPlan.projectId, scheduleDraft.id);
    setScheduleDraft(null);
  }

  return (
    <div className="execution-layout">
      <section className="module-table-panel">
        <div className="section-heading">
          <div>
            <h3>수행 과제 목록</h3>
            <p>과제를 선택하면 당해년도 월별 타임라인과 실제 수행 업무가 바뀝니다.</p>
          </div>
        </div>
        <div className="data-table-shell">
          <table className="data-table project-portfolio-table compact-project-table">
            <thead>
              <tr>
                <th>진행 상태</th>
                <th>주무부처</th>
                <th>전문기관</th>
                <th>사업명</th>
                <th>과제번호</th>
                <th>과제명</th>
                <th>연구책임자</th>
                <th>수행기간</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className={selectedProjectId === project.id ? 'selected' : ''} onClick={() => onSelectProject(project.id)}>
                  <td><span className="stage-chip">{project.status}</span></td>
                  <td>{project.ministry}</td>
                  <td>{project.agency}</td>
                  <td>{project.program}</td>
                  <td>{project.projectNo}</td>
                  <td className="strong-cell">{project.name}</td>
                  <td>{project.director}</td>
                  <td>{project.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="execution-detail-grid">
        <article className="module-table-panel">
          <div className="section-heading">
            <div>
              <h3>월별 타임라인</h3>
              <p>{selectedProject.name}의 현재 시점부터 12월까지 추진 일정입니다.</p>
            </div>
            <div className="section-actions">
              <button onClick={openNewSchedule} type="button">
                <Plus size={14} />
                일정 추가
              </button>
              <DeleteSelectedButton
                count={scheduleSelection.selectedCount}
                label="일정 삭제"
                onClick={() => {
                  onDeleteSchedules(selectedPlan.projectId, scheduleSelection.selectedIds);
                  scheduleSelection.clear();
                }}
              />
              <button
                onClick={() =>
                  onExportCsv('월별일정표.csv', [
                    { key: 'project', label: '과제명' },
                    { key: 'category', label: '수행 항목' },
                    { key: 'title', label: '업무' },
                    { key: 'startMonth', label: '시작월' },
                    { key: 'endMonth', label: '종료월' },
                    { key: 'owner', label: '담당자' },
                    { key: 'status', label: '상태' },
                    { key: 'color', label: '색상' },
                  ], scheduleRows)
                }
                type="button"
              >
                일정표 생성
              </button>
            </div>
          </div>
          <div className="timeline-bar-board">
            <div className="timeline-head timeline-bar-head">
              <span>수행 항목</span>
              {executionMonths.map((month) => <span key={month}>{month}월</span>)}
            </div>
            {scheduleRows.map((item) => {
              const startIndex = Math.max(0, executionMonths.indexOf(item.startMonth));
              const endIndex = Math.max(startIndex, executionMonths.indexOf(item.endMonth));
              const statusClass = String(item.status ?? '').replaceAll(' ', '-');
              return (
                <div className="timeline-bar-row" key={item.id ?? `${item.category}-${item.title}`}>
                  <strong>
                    <span className="timeline-select" onClick={(event) => event.stopPropagation()}>
                      <input
                        aria-label={`${item.title} 일정 선택`}
                        checked={scheduleSelection.isSelected(item.id)}
                        onChange={() => scheduleSelection.toggleRow(item.id)}
                        type="checkbox"
                      />
                    </span>
                    <span className="timeline-category-text">{item.category}</span>
                    <small>{item.owner} · {item.status}</small>
                  </strong>
                  <div className="timeline-bar-track">
                    {executionMonths.map((month) => <span key={`${item.id}-${month}`} />)}
                    <button
                      className={`timeline-bar ${statusClass}`}
                      onClick={() => openScheduleEdit(item)}
                      style={{
                        gridColumn: `${startIndex + 1} / ${endIndex + 2}`,
                        '--timeline-color': item.color,
                      }}
                      type="button"
                    >
                      <span>{item.title}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="module-table-panel">
          <div className="section-heading">
            <div>
              <h3>주요 목표</h3>
              <p>당해년도에 바로 확인할 수행 목표입니다.</p>
            </div>
            <button onClick={() => setToast('목표별 누락 근거를 점검했습니다.')} type="button">누락 점검</button>
          </div>
          <div className="data-table-shell">
            <table className="data-table goal-table">
              <thead>
                <tr>
                  <th>주요 목표</th>
                  <th>지표</th>
                  <th>기한</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                {goalRows.map((goal) => (
                  <tr key={goal.id}>
                    <td className="strong-cell">{goal.goal}</td>
                    <td>{goal.metric}</td>
                    <td>{goal.due}</td>
                    <td>{goal.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="module-table-panel">
        <div className="section-heading">
          <div>
            <h3>실제 수행 업무</h3>
            <p>월별 타임라인의 하위 업무범주를 표로 입력하고 선택 업무 상세와 연결합니다.</p>
          </div>
          <button onClick={() => onAddTask(selectedPlan.projectId)} type="button">
            <Plus size={14} />
            수행 업무 입력
          </button>
          <DeleteSelectedButton
            count={taskSelection.selectedCount}
            onClick={() => {
              onDeleteTasks(taskSelection.selectedIds);
              taskSelection.clear();
            }}
          />
        </div>
        <div className="data-table-shell">
          <table className="data-table execution-work-table">
            <thead>
              <tr>
                <SelectionHeader label="실제 수행 업무" selection={taskSelection} />
                <th>구분</th>
                <th>업무범주</th>
                <th>업무명</th>
                <th>담당자명</th>
                <th>현황</th>
                <th>마감 예정</th>
                <th>수정</th>
              </tr>
            </thead>
            <tbody>
              {projectTasks.map((item) => (
                <tr key={item.id} onClick={() => chooseItem(item)}>
                  <SelectionCell
                    checked={taskSelection.isSelected(item.id)}
                    label={`${item.task} 선택`}
                    onChange={() => taskSelection.toggleRow(item.id)}
                  />
                  <td><span className="stage-chip">{executionStatusGroup(item)}</span></td>
                  <td>{item.workCategory ?? item.stage}</td>
                  <td className="strong-cell">{item.task}</td>
                  <td>{item.owner}</td>
                  <td>{item.status}</td>
                  <td>{item.due}</td>
                  <td>
                    <button className="card-close-action row-edit-action" onClick={(event) => {
                      event.stopPropagation();
                      setTaskEditDraft(item);
                    }} type="button">수정</button>
                  </td>
                </tr>
              ))}
              {!projectTasks.length && (
                <tr>
                  <td colSpan="8">등록된 수행 업무가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {scheduleDraft && (
        <ScheduleEditModal
          draft={scheduleDraft}
          onClose={() => setScheduleDraft(null)}
          onDelete={deleteScheduleDraft}
          onSave={saveScheduleDraft}
          onUpdate={(field, value) => setScheduleDraft((draft) => ({ ...draft, [field]: value }))}
        />
      )}
      {taskEditDraft && (
        <WorkItemEditModal
          contextId="execution"
          item={taskEditDraft}
          onClose={() => setTaskEditDraft(null)}
          onSave={(item) => {
            onSaveTask(item);
            setTaskEditDraft(null);
          }}
        />
      )}
    </div>
  );
}

function ScheduleEditModal({ draft, onUpdate, onSave, onDelete, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal edit-modal" role="dialog" aria-modal="true" aria-labelledby="schedule-edit-title">
        <div className="modal-header">
          <div>
            <h2 id="schedule-edit-title">월별 일정 입력</h2>
            <p>수행 항목, 기간, 색상을 직접 지정하면 타임라인 막대에 반영됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <form className="data-entry-form edit-modal-body" onSubmit={onSave}>
          <div className="form-grid compact">
            <label>
              수행 항목
              <input value={draft.category} onChange={(event) => onUpdate('category', event.target.value)} />
            </label>
            <label>
              업무명
              <input value={draft.title} onChange={(event) => onUpdate('title', event.target.value)} />
            </label>
          </div>
          <div className="form-grid compact">
            <label>
              시작월
              <select value={draft.startMonth} onChange={(event) => onUpdate('startMonth', Number(event.target.value))}>
                {executionMonths.map((month) => <option key={month} value={month}>{month}월</option>)}
              </select>
            </label>
            <label>
              종료월
              <select value={draft.endMonth} onChange={(event) => onUpdate('endMonth', Number(event.target.value))}>
                {executionMonths.map((month) => <option key={month} value={month}>{month}월</option>)}
              </select>
            </label>
            <label>
              색상
              <input type="color" value={draft.color ?? '#155eef'} onChange={(event) => onUpdate('color', event.target.value)} />
            </label>
          </div>
          <div className="form-grid compact">
            <label>
              담당자
              <select value={draft.owner} onChange={(event) => onUpdate('owner', event.target.value)}>
                {members.map((member) => <option key={member.name}>{member.name}</option>)}
              </select>
            </label>
            <label>
              상태
              <select value={draft.status} onChange={(event) => onUpdate('status', event.target.value)}>
                {statusOptions.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
          </div>
          <div className="button-row modal-actions sticky-modal-actions">
            <button className="danger-button stretch" onClick={onDelete} type="button">삭제</button>
            <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
            <button className="primary-action stretch" type="submit">저장</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function ModuleRegister({ activeNav, items, chooseItem, onCompleteItem, onDeleteItems, onSaveItem, onExportCsv, onAddNew, setToast }) {
  const [editDraft, setEditDraft] = useState(null);
  const isAssetRegister = activeNav === 'assets';
  const exportColumns = isAssetRegister ? assetWorkCsvColumns : workCsvColumns;
  const exportRows = isAssetRegister ? assetWorkCsvRows(items) : workCsvRows(items);
  const itemSelection = useRowSelection(items);

  return (
    <div className="module-register">
      <div className="section-heading">
        <h3>모듈 업무 목록</h3>
        <div className="section-actions">
          <button onClick={onAddNew} type="button">
            <Plus size={14} />
            업무 입력
          </button>
          <DeleteSelectedButton
            count={itemSelection.selectedCount}
            onClick={() => {
              onDeleteItems(itemSelection.selectedIds);
              itemSelection.clear();
            }}
          />
          <button onClick={() => onExportCsv('모듈업무목록.csv', exportColumns, exportRows)} type="button">
            <Download size={14} />
            CSV
          </button>
          <button onClick={() => setToast('선택 모듈 업무 목록을 새로고침했습니다.')} type="button">
            <RefreshCw size={14} />
            새로고침
          </button>
        </div>
      </div>
      <div className="data-table-shell">
        <table className="data-table module-work-table">
          <thead>
            <tr>
              <SelectionHeader label="모듈 업무 목록" selection={itemSelection} />
              {isAssetRegister ? <th>업무 범주</th> : <th>구분</th>}
              {!isAssetRegister && <th>과제/사업명</th>}
              <th>업무명</th>
              <th>담당자</th>
              <th>상태</th>
              <th>마감</th>
              <th>필요 증빙</th>
              <th>외부기관</th>
              <th>수정</th>
              <th>마감 처리</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} onClick={() => chooseItem(item)}>
                <SelectionCell
                  checked={itemSelection.isSelected(item.id)}
                  label={`${item.task} 선택`}
                  onChange={() => itemSelection.toggleRow(item.id)}
                />
                <td>
                  {isAssetRegister ? (
                    <span className="stage-chip">{item.workCategory ?? getDefaultWorkCategory('assets', '자료 제작')}</span>
                  ) : (
                    <span className={`type-chip ${typeColors[item.type]}`}>{item.type}</span>
                  )}
                </td>
                {!isAssetRegister && <td>{item.project}</td>}
                <td className="strong-cell">{item.task}</td>
                <td>{item.owner}</td>
                <td><span className="stage-chip">{item.status}</span></td>
                <td>{item.due}</td>
                <td>{item.evidenceNeed}</td>
                <td>{item.institution}</td>
                <td>
                  <button className="card-close-action row-edit-action" onClick={(event) => {
                    event.stopPropagation();
                    setEditDraft(item);
                  }} type="button">수정</button>
                </td>
                <td>
                  <button className="card-close-action" onClick={(event) => {
                    event.stopPropagation();
                    onCompleteItem(item);
                  }} type="button">마감</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editDraft && (
        <WorkItemEditModal
          contextId={activeNav}
          item={editDraft}
          onClose={() => setEditDraft(null)}
          onSave={(item) => {
            onSaveItem(item);
            setEditDraft(null);
          }}
        />
      )}
    </div>
  );
}

function WorkItemEditModal({ contextId, item, onSave, onClose }) {
  const [draft, setDraft] = useState(() => ({
    ...item,
    type: item.type ?? '업무',
    project: item.project ?? '',
    task: item.task ?? '',
    owner: item.owner ?? members[0]?.name ?? '',
    status: item.status ?? '작성',
    due: item.due ?? '',
    evidenceNeed: item.evidenceNeed ?? '',
    institution: item.institution ?? '',
    memo: item.memo ?? '',
    workCategory: normalizeWorkCategory(contextId, item.type, item.workCategory),
    evidenceText: Array.isArray(item.evidence) ? item.evidence.join('\n') : item.evidence ?? '',
  }));
  const categoryOptions = getWorkCategoryOptions(contextId, draft.type);

  function updateDraft(field, value) {
    setDraft((state) => ({ ...state, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.task.trim()) return;
    const { evidenceText, ...nextDraft } = draft;
    onSave({
      ...nextDraft,
      project: nextDraft.project || (contextId === 'assets' ? '자료 제작' : ''),
      workCategory: normalizeWorkCategory(contextId, nextDraft.type, nextDraft.workCategory),
      evidence: toList(evidenceText),
      evidenceNeed: nextDraft.evidenceNeed || '신규 등록',
      institution: nextDraft.institution || '-',
      status: nextDraft.status || '작성',
    });
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal edit-modal" role="dialog" aria-modal="true" aria-labelledby="work-item-edit-title">
        <div className="modal-header">
          <div>
            <h2 id="work-item-edit-title">업무 항목 수정</h2>
            <p>저장하면 목록과 세부 업무량 현황에 같은 업무 범주로 반영됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <form className="data-entry-form edit-modal-body" onSubmit={handleSubmit}>
          <div className="form-grid compact">
            <label>
              구분
              <input value={draft.type} readOnly />
            </label>
            <label>
              과제/사업명
              <input value={draft.project} onChange={(event) => updateDraft('project', event.target.value)} />
            </label>
          </div>
          <div className="form-field-block">
            <span>업무범주</span>
            <div className="category-toggle-grid" role="group" aria-label="업무범주 선택">
              {categoryOptions.map((category) => (
                <button
                  className={draft.workCategory === category ? 'active' : ''}
                  key={category}
                  onClick={() => updateDraft('workCategory', category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <label>
            업무명
            <input value={draft.task} onChange={(event) => updateDraft('task', event.target.value)} />
          </label>
          <div className="form-grid compact">
            <label>
              담당자
              <select value={draft.owner} onChange={(event) => updateDraft('owner', event.target.value)}>
                {members.map((member) => (
                  <option key={member.name}>{member.name}</option>
                ))}
              </select>
            </label>
            <label>
              상태
              <select value={draft.status} onChange={(event) => updateDraft('status', event.target.value)}>
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
            <label>
              마감일
              <input type="date" value={draft.due ?? ''} onChange={(event) => updateDraft('due', event.target.value)} />
            </label>
          </div>
          <div className="form-grid compact">
            <label>
              필요 증빙
              <input value={draft.evidenceNeed} onChange={(event) => updateDraft('evidenceNeed', event.target.value)} />
            </label>
            <label>
              외부기관
              <input value={draft.institution} onChange={(event) => updateDraft('institution', event.target.value)} />
            </label>
          </div>
          <FileAttachmentEditor
            files={draft.evidenceText}
            label="첨부 파일"
            onChange={(files) => updateDraft('evidenceText', files.join('\n'))}
          />
          <label>
            메모
            <textarea value={draft.memo ?? ''} onChange={(event) => updateDraft('memo', event.target.value)} />
          </label>
          <div className="button-row modal-actions sticky-modal-actions">
            <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
            <button className="primary-action stretch" type="submit">저장</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function RegisterDeadlineCalendar({ items, dateRange, selectedId, chooseItem }) {
  const days = getDateRangeDays(dateRange);
  const grouped = days.map((day) => ({
    ...day,
    entries: items
      .filter((item) => item.due === day.date)
      .sort((a, b) => a.project.localeCompare(b.project) || a.task.localeCompare(b.task)),
  }));

  return (
    <div className="register-calendar" aria-label="통합 업무 레지스터 달력 보기">
      {grouped.map((day) => (
        <article key={day.date} className={day.entries.length ? 'has-entry' : ''}>
          <div className="register-calendar-day">
            <span>{day.label}</span>
            <strong>{day.short}</strong>
          </div>
          <div className="register-calendar-list">
            {day.entries.length ? (
              day.entries.map((item) => (
                <button
                  key={item.id}
                  className={`register-calendar-entry ${selectedId === item.id ? 'selected' : ''}`}
                  onClick={() => chooseItem(item)}
                  type="button"
                >
                  <span className={`type-chip ${typeColors[item.type]}`}>{item.type}</span>
                  <strong>{item.project}</strong>
                  <p>{item.task}</p>
                  <small>{item.owner}</small>
                </button>
              ))
            ) : (
              <p className="register-calendar-empty">마감 없음</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function UpcomingDeadlinePanel({ workItems, onOpenItem, onShowAll }) {
  const upcomingItems = (Array.isArray(workItems) ? workItems : [])
    .slice()
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 5);

  return (
    <div className="panel deadline-panel">
      <div className="panel-header">
        <div>
          <h2>다가오는 마감</h2>
          <p>마감일이 가까운 업무를 우선 확인합니다.</p>
        </div>
        <button onClick={onShowAll} type="button">전체 보기</button>
      </div>
      <div className="deadline-list">
        {upcomingItems.map((item) => (
          <button key={item.id} onClick={() => onOpenItem(item)} type="button">
            <CalendarDays size={16} />
            <span>
              <b>{item.due.slice(5)}</b>
              {item.task}
            </span>
            <strong>D-{Math.max(0, daysLeft(item.due))}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

function WorkDetailModal({
  detailDraft,
  members,
  selectedComments,
  activeUserName,
  commentDraft,
  onClose,
  onUpdateDraft,
  onOpenDossier,
  onAddEvidence,
  onRemoveEvidence,
  onDeleteComment,
  onUpdateCommentDraft,
  onAddComment,
  onDelete,
  onSave,
  onComplete,
}) {
  const evidenceFiles = Array.isArray(detailDraft.evidence) ? detailDraft.evidence : toList(detailDraft.evidence);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <section className="modal detail-modal" role="dialog" aria-modal="true" aria-labelledby="work-detail-title">
        <div className="modal-header">
          <div>
            <h2 id="work-detail-title">선택 업무 상세</h2>
            <p>{detailDraft.id}</p>
          </div>
          <button
            className="icon-button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            type="button"
            aria-label="상세 닫기"
          >
            <X size={18} />
          </button>
        </div>

        <div className="detail-form modal-detail-form">
          <label>
            업무명
            <input value={detailDraft.task} onChange={(event) => onUpdateDraft('task', event.target.value)} />
          </label>
          <label>
            연결 과제
            <div className="input-with-button">
              <input value={detailDraft.project} onChange={(event) => onUpdateDraft('project', event.target.value)} />
              <button onClick={onOpenDossier} type="button">과제 열기</button>
            </div>
          </label>

          <div className="form-grid">
            <label>
              담당자
              <select value={detailDraft.owner} onChange={(event) => onUpdateDraft('owner', event.target.value)}>
                {members.map((member) => (
                  <option key={member.name}>{member.name}</option>
                ))}
              </select>
            </label>
            <label>
              단계
              <select value={detailDraft.stage} onChange={(event) => onUpdateDraft('stage', event.target.value)}>
                <option>계획</option>
                <option>작성</option>
                <option>수행</option>
                <option>확인</option>
                <option>의뢰</option>
                <option>정산</option>
                <option>진행</option>
                <option>종결</option>
              </select>
            </label>
            <label>
              마감일
              <input type="date" value={detailDraft.due} onChange={(event) => onUpdateDraft('due', event.target.value)} />
            </label>
            <label>
              확인 상태
              <select value={detailDraft.risk} onChange={(event) => onUpdateDraft('risk', event.target.value)}>
                <option value="낮음">안정</option>
                <option value="중">관찰</option>
                <option value="높음">확인 필요</option>
              </select>
            </label>
          </div>

          <label>
            업무 상태
            <select value={detailDraft.status} onChange={(event) => onUpdateDraft('status', event.target.value)}>
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>

          <label>
            업무 내용 / 메모
            <textarea value={detailDraft.memo} onChange={(event) => onUpdateDraft('memo', event.target.value)} />
          </label>

          <div className="form-grid">
            <label>
              필요한 증빙
              <input value={detailDraft.evidenceNeed} onChange={(event) => onUpdateDraft('evidenceNeed', event.target.value)} />
            </label>
            <label>
              외부기관
              <input value={detailDraft.institution} onChange={(event) => onUpdateDraft('institution', event.target.value)} />
            </label>
          </div>

          <div className="form-grid">
            <label>
              확인할 항목
              <input value={detailDraft.blocker} onChange={(event) => onUpdateDraft('blocker', event.target.value)} />
            </label>
            <label>
              다음 액션
              <input value={detailDraft.nextAction} onChange={(event) => onUpdateDraft('nextAction', event.target.value)} />
            </label>
          </div>

          <div className="evidence-box">
            <div className="section-label">
              관련 증빙 파일
              <button onClick={onAddEvidence} type="button">
                <Upload size={14} />
                추가
              </button>
            </div>
            <div className="evidence-list">
              {evidenceFiles.length ? (
                evidenceFiles.map((file) => (
                  <span className="evidence-chip editable" key={file}>
                    <FileText size={14} />
                    {file}
                    <button onClick={() => onRemoveEvidence(file)} type="button" aria-label={`${file} 삭제`}>
                      <X size={12} />
                    </button>
                  </span>
                ))
              ) : (
                <p>등록된 증빙이 없습니다.</p>
              )}
            </div>
          </div>

          <div className="comment-box">
            <div className="section-label">
              담당자 의견
              <span>{selectedComments.length}건</span>
            </div>
            <div className="comment-list">
              {selectedComments.length ? (
                selectedComments.map((comment) => (
                  <article key={comment.id}>
                    <div>
                      <strong>{comment.member}</strong>
                      <span>{comment.date}</span>
                      {comment.member === activeUserName && (
                        <button onClick={() => onDeleteComment(comment)} type="button">삭제</button>
                      )}
                    </div>
                    <p>{comment.text}</p>
                  </article>
                ))
              ) : (
                <p>등록된 의견이 없습니다.</p>
              )}
            </div>
            <div className="comment-input-row">
              <select value={commentDraft.member} onChange={(event) => onUpdateCommentDraft((draft) => ({ ...draft, member: event.target.value }))}>
                {members
                  .filter((member) => member.name !== detailDraft.owner)
                  .map((member) => (
                    <option key={member.name}>{member.name}</option>
                  ))}
              </select>
              <input
                value={commentDraft.text}
                onChange={(event) => onUpdateCommentDraft((draft) => ({ ...draft, text: event.target.value }))}
                placeholder="다른 담당자가 남길 의견 입력"
              />
              <button onClick={onAddComment} type="button">의견 추가</button>
            </div>
          </div>

          <div className="button-row modal-actions sticky-modal-actions">
            <button className="danger-button" onClick={onDelete} type="button">
              삭제
            </button>
            <button className="secondary-action stretch" onClick={() => onSave('임시 저장했습니다.')} type="button">
              임시저장
            </button>
            <button className="primary-action stretch" onClick={() => onComplete(detailDraft)} type="button">
              마감
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function TestInstitutionPanel({
  institutions,
  selectedId,
  draft,
  onSelect,
  onUpdateRow,
  onUpdateDraft,
  onAddNew,
  onDelete,
  onDeleteMany,
  onExportCsv,
  requests,
  selectedRequestId,
  onSelectRequest,
  onUpdateRequest,
  onAddRequest,
  onSaveRequest,
  onDeleteRequests,
  setToast,
}) {
  const selectedRequest = requests.find((request) => request.id === selectedRequestId) ?? requests[0];
  const [isAnalysisAddOpen, setAnalysisAddOpen] = useState(false);
  const [requestEditDraft, setRequestEditDraft] = useState(null);
  const [isInstitutionEditOpen, setInstitutionEditOpen] = useState(false);
  const institutionSelection = useRowSelection(institutions);
  const requestSelection = useRowSelection(requests);

  return (
    <div className="test-workspace">
      <section className="module-table-panel">
        <div className="section-heading">
          <div>
            <h3>시험 의뢰기관 목록</h3>
            <p>기관별 시험 항목, 접속 URL, 계정 정보를 직접 관리합니다.</p>
          </div>
          <div className="section-actions">
            <button onClick={onExportCsv} type="button">
              <Download size={14} />
              CSV
            </button>
            <button onClick={() => {
              onAddNew();
              setInstitutionEditOpen(true);
            }} type="button">
              <Plus size={14} />
              기관 추가
            </button>
            <DeleteSelectedButton
              count={institutionSelection.selectedCount}
              label="기관 삭제"
              onClick={() => {
                onDeleteMany(institutionSelection.selectedIds);
                institutionSelection.clear();
              }}
            />
          </div>
        </div>

        <div className="module-data-layout">
          <div className="data-table-shell">
            <table className="data-table test-institution-table">
              <thead>
                <tr>
                  <SelectionHeader label="시험 의뢰기관 목록" selection={institutionSelection} />
                  <th>순번</th>
                  <th>기관명</th>
                  <th>시험 항목</th>
                  <th>URL</th>
                  <th>ID</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {institutions.map((institution) => (
                  <tr key={institution.id} className={selectedId === institution.id ? 'selected' : ''} onClick={() => onSelect(institution)}>
                    <SelectionCell
                      checked={institutionSelection.isSelected(institution.id)}
                      label={`${institution.institution} 선택`}
                      onChange={() => institutionSelection.toggleRow(institution.id)}
                    />
                    <td>{institution.seq}</td>
                    <td className="strong-cell">{institution.institution}</td>
                    <td>{institution.testItem}</td>
                    <td>
                      {normalizeUrl(institution.url) ? (
                        <a href={normalizeUrl(institution.url)} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
                          {institution.url}
                        </a>
                      ) : '-'}
                    </td>
                    <td>{institution.accountId}</td>
                    <td>{maskSecret(institution.password)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="fixed-info-panel">
            <div className="fixed-info-head">
              <div>
                <h4>{draft.institution}</h4>
                <p>{draft.testItem}</p>
              </div>
              <button onClick={() => setInstitutionEditOpen(true)} type="button">기관 입력</button>
            </div>
            <div className="fixed-info-grid">
              <article><span>순번</span><strong>{draft.seq}</strong></article>
              <article>
                <span>URL</span>
                <strong>
                  {normalizeUrl(draft.url) ? <a href={normalizeUrl(draft.url)} target="_blank" rel="noreferrer">{draft.url}</a> : '-'}
                </strong>
              </article>
              <article><span>ID</span><strong>{draft.accountId}</strong></article>
              <article><span>Password</span><strong className="masked-secret">{maskSecret(draft.password)}</strong></article>
            </div>
            <div className="button-row">
              <button className="danger-button" onClick={onDelete} type="button">삭제</button>
              <button className="secondary-action stretch" onClick={() => setToast('선택 시험기관 정보를 확인했습니다.')} type="button">확인</button>
            </div>
          </div>
        </div>
      </section>

      <section className="test-request-grid">
        <article className="module-table-panel">
          <div className="section-heading">
            <div>
              <h3>시험·분석 의뢰 진행 목록</h3>
              <p>의뢰일자, 기관, 항목, 의뢰자를 기준으로 진행 현황을 확인합니다.</p>
            </div>
            <div className="section-actions">
              <button onClick={() => onExportCsv('시험분석의뢰목록.csv', testRequestCsvColumns, requests)} type="button">
                <Download size={14} />
                CSV
              </button>
              <button onClick={() => setAnalysisAddOpen(true)} type="button">
                <Plus size={14} />
                분석 추가
              </button>
              <DeleteSelectedButton
                count={requestSelection.selectedCount}
                label="분석 삭제"
                onClick={() => {
                  onDeleteRequests(requestSelection.selectedIds);
                  requestSelection.clear();
                }}
              />
            </div>
          </div>
          <div className="data-table-shell">
            <table className="data-table test-request-table">
              <thead>
                <tr>
                  <SelectionHeader label="시험·분석 의뢰 진행 목록" selection={requestSelection} />
                  <th>의뢰일자</th>
                  <th>업무 범주</th>
                  <th>의뢰기관</th>
                  <th>의뢰항목</th>
                  <th>의뢰자</th>
                  <th>소요기간</th>
                  <th>수정</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className={selectedRequestId === request.id ? 'selected' : ''} onClick={() => onSelectRequest(request.id)}>
                    <SelectionCell
                      checked={requestSelection.isSelected(request.id)}
                      label={`${request.item} 선택`}
                      onChange={() => requestSelection.toggleRow(request.id)}
                    />
                    <td>{request.requestDate}</td>
                    <td>{request.workCategory}</td>
                    <td>{request.institution}</td>
                    <td className="strong-cell">{request.item}</td>
                    <td>{request.requester}</td>
                    <td>{displayValue(request.duration)}</td>
                    <td>
                      <button className="card-close-action row-edit-action" onClick={(event) => {
                        event.stopPropagation();
                        setRequestEditDraft(request);
                      }} type="button">수정</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {selectedRequest ? (
          <article className="fixed-info-panel">
            <h4>{selectedRequest.item}</h4>
            <div className="form-grid compact">
              <article className="fixed-section"><h5>의뢰 목적</h5><p>{selectedRequest.purpose}</p></article>
              <article className="fixed-section"><h5>해당 과제</h5><p>{selectedRequest.project}</p></article>
              <article className="fixed-section"><h5>소요기간</h5><p>{displayValue(selectedRequest.duration)}</p></article>
            </div>
            <div className="fixed-section"><h5>해석</h5><p>{selectedRequest.interpretation}</p></div>
            <div className="test-image-grid">
              {selectedRequest.images.map((image) => (
                <button key={image} onClick={() => setRequestEditDraft(selectedRequest)} type="button">
                  <div className="test-thumb-preview"><span>{getFileExtension(image)}</span></div>
                  <strong>{image}</strong>
                </button>
              ))}
            </div>
          </article>
        ) : (
          <article className="fixed-info-panel">
            <h4>선택된 의뢰 없음</h4>
            <p className="empty-panel-copy">분석 추가 버튼으로 새 의뢰를 등록할 수 있습니다.</p>
          </article>
        )}
      </section>

      <section className="module-table-panel">
        <div className="section-heading">
          <div>
            <h3>업로드 이미지</h3>
            <p>순차적으로 업로드된 이미지를 선택하면 해당 의뢰 상세로 이동합니다.</p>
          </div>
        </div>
        <div className="test-image-strip">
          {requests.flatMap((request) => request.images.map((image) => ({ image, request }))).map(({ image, request }) => (
            <button key={`${request.id}-${image}`} onClick={() => {
              onSelectRequest(request.id);
              setRequestEditDraft(request);
            }} type="button">
              <div className="test-thumb-preview"><span>{getFileExtension(image)}</span></div>
              <strong>{image}</strong>
              <span>{request.item}</span>
            </button>
          ))}
        </div>
      </section>
      {isAnalysisAddOpen && (
        <TestRequestAddModal
          onAddRequest={(request) => {
            onAddRequest(request);
            setAnalysisAddOpen(false);
          }}
          onClose={() => setAnalysisAddOpen(false)}
        />
      )}
      {isInstitutionEditOpen && (
        <TestInstitutionEditModal
          draft={draft}
          onClose={() => setInstitutionEditOpen(false)}
          onSave={(event) => {
            const saved = onSaveTestInstitution(event);
            if (saved !== false) setInstitutionEditOpen(false);
          }}
          onUpdateDraft={onUpdateDraft}
        />
      )}
      {requestEditDraft && (
        <TestRequestEditModal
          request={requestEditDraft}
          onClose={() => setRequestEditDraft(null)}
          onSaveRequest={(request) => {
            onSaveRequest(request);
            setRequestEditDraft(null);
          }}
        />
      )}
    </div>
  );
}

function TestInstitutionEditModal({ draft, onUpdateDraft, onSave, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal edit-modal" role="dialog" aria-modal="true" aria-labelledby="test-institution-edit-title">
        <div className="modal-header">
          <div>
            <h2 id="test-institution-edit-title">시험 의뢰기관 입력</h2>
            <p>저장하면 시험 의뢰기관 목록에 고정 정보로 표시됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <form className="data-entry-form edit-modal-body" onSubmit={onSave}>
          <div className="form-grid compact">
            <label>
              순번
              <input type="number" min="1" value={draft.seq} onChange={(event) => onUpdateDraft('seq', event.target.value)} />
            </label>
            <label>
              기관명
              <input value={draft.institution} onChange={(event) => onUpdateDraft('institution', event.target.value)} />
            </label>
          </div>
          <label>
            시험 항목
            <input value={draft.testItem} onChange={(event) => onUpdateDraft('testItem', event.target.value)} />
          </label>
          <label>
            URL
            <input value={draft.url} onChange={(event) => onUpdateDraft('url', event.target.value)} placeholder="https:// 또는 도메인 입력" />
          </label>
          <div className="form-grid compact">
            <label>
              ID
              <input value={draft.accountId} onChange={(event) => onUpdateDraft('accountId', event.target.value)} />
            </label>
            <label>
              Password
              <input value={draft.password} onChange={(event) => onUpdateDraft('password', event.target.value)} />
            </label>
          </div>
          <div className="button-row modal-actions sticky-modal-actions">
            <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
            <button className="primary-action stretch" type="submit">저장</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function TestRequestAddModal({ onAddRequest, onClose }) {
  const [draft, setDraft] = useState(createEmptyTestRequest);
  const categoryOptions = getWorkCategoryOptions('test', '시험·분석 의뢰');

  function updateDraft(field, value) {
    setDraft((item) => ({ ...item, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.institution.trim() || !draft.item.trim()) return;
    onAddRequest({
      ...draft,
      images: toList(draft.images),
    });
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal edit-modal" role="dialog" aria-modal="true" aria-labelledby="test-request-add-title">
        <div className="modal-header">
          <div>
            <h2 id="test-request-add-title">시험·분석 의뢰 추가</h2>
            <p>저장하면 진행 목록과 업로드 이미지 영역에 고정 정보로 표시됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <form className="data-entry-form edit-modal-body" onSubmit={handleSubmit}>
          <div className="form-grid compact">
            <label>
              의뢰일자
              <input type="date" value={draft.requestDate} onChange={(event) => updateDraft('requestDate', event.target.value)} />
            </label>
            <label>
              소요기간
              <input value={draft.duration} onChange={(event) => updateDraft('duration', event.target.value)} placeholder="예: 14일" />
            </label>
            <label>
              의뢰기관
              <input value={draft.institution} onChange={(event) => updateDraft('institution', event.target.value)} />
            </label>
            <label>
              의뢰자
              <select value={draft.requester} onChange={(event) => updateDraft('requester', event.target.value)}>
                {members.map((member) => (
                  <option key={member.name}>{member.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-field-block">
            <span>업무범주</span>
            <div className="category-toggle-grid" role="group" aria-label="시험·분석 의뢰 업무범주 선택">
              {categoryOptions.map((category) => (
                <button
                  className={draft.workCategory === category ? 'active' : ''}
                  key={category}
                  onClick={() => updateDraft('workCategory', category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <label>
            의뢰항목
            <input value={draft.item} onChange={(event) => updateDraft('item', event.target.value)} />
          </label>
          <label>
            해당 과제
            <input value={draft.project} onChange={(event) => updateDraft('project', event.target.value)} />
          </label>
          <label>
            의뢰 목적
            <textarea value={draft.purpose} onChange={(event) => updateDraft('purpose', event.target.value)} />
          </label>
          <label>
            해석
            <textarea value={draft.interpretation} onChange={(event) => updateDraft('interpretation', event.target.value)} />
          </label>
          <FileAttachmentEditor
            accept="image/*"
            files={draft.images}
            label="이미지 파일"
            onChange={(files) => updateDraft('images', files)}
          />
          <div className="button-row modal-actions sticky-modal-actions">
            <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
            <button className="primary-action stretch" type="submit">저장</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function TestRequestEditModal({ request, onSaveRequest, onClose }) {
  const [draft, setDraft] = useState(() => ({
    ...request,
    requestDate: request.requestDate ?? '',
    institution: request.institution ?? '',
    item: request.item ?? '',
    requester: request.requester ?? members[0]?.name ?? '',
    duration: request.duration ?? '',
    purpose: request.purpose ?? '',
    project: request.project ?? '',
    interpretation: request.interpretation ?? '',
    workCategory: normalizeWorkCategory('test', '시험·분석 의뢰', request.workCategory),
    imagesText: Array.isArray(request.images) ? request.images.join('\n') : request.images ?? '',
  }));
  const categoryOptions = getWorkCategoryOptions('test', '시험·분석 의뢰');

  function updateDraft(field, value) {
    setDraft((item) => ({ ...item, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.institution.trim() || !draft.item.trim()) return;
    const { imagesText, ...nextDraft } = draft;
    onSaveRequest({
      ...nextDraft,
      workCategory: normalizeWorkCategory('test', '시험·분석 의뢰', nextDraft.workCategory),
      images: toList(imagesText),
    });
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal edit-modal" role="dialog" aria-modal="true" aria-labelledby="test-request-edit-title">
        <div className="modal-header">
          <div>
            <h2 id="test-request-edit-title">시험·분석 의뢰 수정</h2>
            <p>저장하면 진행 목록, 상세 정보, 세부 업무량 현황이 함께 갱신됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <form className="data-entry-form edit-modal-body" onSubmit={handleSubmit}>
          <div className="form-grid compact">
            <label>
              의뢰일자
              <input type="date" value={draft.requestDate} onChange={(event) => updateDraft('requestDate', event.target.value)} />
            </label>
            <label>
              소요기간
              <input value={draft.duration} onChange={(event) => updateDraft('duration', event.target.value)} placeholder="예: 14일" />
            </label>
            <label>
              의뢰기관
              <input value={draft.institution} onChange={(event) => updateDraft('institution', event.target.value)} />
            </label>
            <label>
              의뢰자
              <select value={draft.requester} onChange={(event) => updateDraft('requester', event.target.value)}>
                {members.map((member) => (
                  <option key={member.name}>{member.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-field-block">
            <span>업무범주</span>
            <div className="category-toggle-grid" role="group" aria-label="시험·분석 의뢰 업무범주 선택">
              {categoryOptions.map((category) => (
                <button
                  className={draft.workCategory === category ? 'active' : ''}
                  key={category}
                  onClick={() => updateDraft('workCategory', category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <label>
            의뢰항목
            <input value={draft.item} onChange={(event) => updateDraft('item', event.target.value)} />
          </label>
          <label>
            해당 과제
            <input value={draft.project} onChange={(event) => updateDraft('project', event.target.value)} />
          </label>
          <label>
            의뢰 목적
            <textarea value={draft.purpose} onChange={(event) => updateDraft('purpose', event.target.value)} />
          </label>
          <label>
            해석
            <textarea value={draft.interpretation} onChange={(event) => updateDraft('interpretation', event.target.value)} />
          </label>
          <FileAttachmentEditor
            accept="image/*"
            files={draft.imagesText}
            label="이미지 파일"
            onChange={(files) => updateDraft('imagesText', files.join('\n'))}
          />
          <div className="button-row modal-actions sticky-modal-actions">
            <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
            <button className="primary-action stretch" type="submit">저장</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function PatentPortfolioPanel({
  patents,
  tasks,
  selectedId,
  draft,
  onSelect,
  onUpdateDraft,
  onSave,
  onAddNew,
  onDeletePatents,
  onAddTask,
  onSaveTask,
  onDeleteTasks,
  chooseItem,
  onCompleteItem,
  onExportCsv,
  setToast,
}) {
  const [isEditOpen, setEditOpen] = useState(false);
  const [taskEditDraft, setTaskEditDraft] = useState(null);
  const patentSelection = useRowSelection(patents);
  const taskSelection = useRowSelection(tasks);

  function handleAddNew() {
    onAddNew();
    setEditOpen(true);
  }

  function handleSave(event) {
    const saved = onSave(event);
    if (saved !== false) setEditOpen(false);
  }

  return (
    <div className="ip-workspace">
      <section className="module-table-panel">
        <div className="section-heading">
          <div>
            <h3>특허 보유 현황</h3>
            <p>출원/등록 상태와 명세서·적용 제품 이력을 선택해서 확인합니다.</p>
          </div>
          <div className="section-actions">
            <button onClick={onExportCsv} type="button">
              <Download size={14} />
              CSV
            </button>
            <button onClick={handleAddNew} type="button">
              <Plus size={14} />
              특허 추가
            </button>
            <DeleteSelectedButton
              count={patentSelection.selectedCount}
              label="특허 삭제"
              onClick={() => {
                onDeletePatents(patentSelection.selectedIds);
                patentSelection.clear();
              }}
            />
          </div>
        </div>

        <div className="patent-layout">
          <div className="data-table-shell">
            <table className="data-table patent-table">
              <thead>
                <tr>
                  <SelectionHeader label="특허 보유 현황" selection={patentSelection} />
                  <th>특허 유형</th>
                  <th>발명의 명칭</th>
                  <th>출원번호</th>
                  <th>출원일</th>
                  <th>등록번호</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {patents.map((patent) => (
                  <tr key={patent.id} className={selectedId === patent.id ? 'selected' : ''} onClick={() => onSelect(patent)}>
                    <SelectionCell
                      checked={patentSelection.isSelected(patent.id)}
                      label={`${patent.title} 선택`}
                      onChange={() => patentSelection.toggleRow(patent.id)}
                    />
                    <td>
                      <span className="stage-chip">{patent.type}</span>
                    </td>
                    <td className="strong-cell">{patent.title || '발명의 명칭 입력'}</td>
                    <td>{patent.applicationNo || '-'}</td>
                    <td>{patent.applicationDate || '-'}</td>
                    <td>{patent.registrationNo || '-'}</td>
                    <td>{patent.registrationDate || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="patent-detail-card">
            <div className="patent-detail-head">
              <div>
                <span className="stage-chip">{draft.type}</span>
                <h4>{draft.title || '특허 정보 입력'}</h4>
              </div>
              <div className="section-actions compact-actions">
                <button onClick={() => setToast('선택 특허의 증빙 파일 목록을 열었습니다.')} type="button">증빙 보기</button>
                <button onClick={() => setEditOpen(true)} type="button">특허 정보 수정</button>
              </div>
            </div>

            <div className="fixed-info-panel">
              <div className="fixed-info-grid">
                <article><span>적용 제품</span><strong>{displayValue(draft.product)}</strong></article>
                <article><span>출원번호</span><strong>{displayValue(draft.applicationNo)}</strong></article>
                <article><span>출원일</span><strong>{displayValue(draft.applicationDate)}</strong></article>
                <article><span>등록번호</span><strong>{displayValue(draft.registrationNo)}</strong></article>
                <article><span>등록일</span><strong>{displayValue(draft.registrationDate)}</strong></article>
                <article><span>증빙</span><strong>{displayValue(draft.specification)}</strong></article>
              </div>
              <div className="fixed-section">
                <h5>요약 정보</h5>
                <p>{displayValue(draft.summary, '요약 정보가 등록되지 않았습니다.')}</p>
              </div>
              <div className="fixed-section">
                <h5>이력</h5>
                <div className="history-list">
                  {(draft.history ?? []).length ? draft.history.map((item) => <span key={item}>{item}</span>) : <p>등록된 이력이 없습니다.</p>}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="module-table-panel">
        <div className="section-heading">
          <div>
            <h3>특허 업무</h3>
            <p>IP 전략, 선행기술, 명세서, 출원 대응 업무를 담당자와 마감 기준으로 관리합니다.</p>
          </div>
          <button onClick={onAddTask} type="button">
            <Plus size={14} />
            업무 추가
          </button>
          <DeleteSelectedButton
            count={taskSelection.selectedCount}
            onClick={() => {
              onDeleteTasks(taskSelection.selectedIds);
              taskSelection.clear();
            }}
          />
        </div>
        <div className="data-table-shell">
          <table className="data-table ip-task-table">
            <thead>
              <tr>
                <SelectionHeader label="특허 업무" selection={taskSelection} />
                <th>업무 범주</th>
                <th>업무명</th>
                <th>담당자</th>
                <th>상태</th>
                <th>마감</th>
                <th>필요 증빙</th>
                <th>수정</th>
                <th>마감 처리</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} onClick={() => chooseItem(task)}>
                  <SelectionCell
                    checked={taskSelection.isSelected(task.id)}
                    label={`${task.task} 선택`}
                    onChange={() => taskSelection.toggleRow(task.id)}
                  />
                  <td>{task.workCategory ?? getDefaultWorkCategory('ip', '특허/IP')}</td>
                  <td className="strong-cell">{task.task}</td>
                  <td>{task.owner}</td>
                  <td><span className="stage-chip">{task.status}</span></td>
                  <td>{task.due}</td>
                  <td>{task.evidenceNeed}</td>
                  <td>
                    <button className="card-close-action row-edit-action" onClick={(event) => {
                      event.stopPropagation();
                      setTaskEditDraft(task);
                    }} type="button">수정</button>
                  </td>
                  <td>
                    <button className="card-close-action" onClick={(event) => {
                      event.stopPropagation();
                      onCompleteItem(task);
                    }} type="button">마감</button>
                  </td>
                </tr>
              ))}
              {!tasks.length && (
                <tr>
                  <td colSpan="9">등록된 특허 업무가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isEditOpen && (
        <PatentEditModal
          draft={draft}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
          onUpdateDraft={onUpdateDraft}
        />
      )}
      {taskEditDraft && (
        <WorkItemEditModal
          contextId="ip"
          item={taskEditDraft}
          onClose={() => setTaskEditDraft(null)}
          onSave={(item) => {
            onSaveTask(item);
            setTaskEditDraft(null);
          }}
        />
      )}
    </div>
  );
}

function PatentEditModal({ draft, onUpdateDraft, onSave, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal edit-modal" role="dialog" aria-modal="true" aria-labelledby="patent-edit-title">
        <div className="modal-header">
          <div>
            <h2 id="patent-edit-title">특허 정보 입력</h2>
            <p>저장하면 특허 보유 현황에는 고정 정보로 표시됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <form className="data-entry-form edit-modal-body" onSubmit={onSave}>
          <div className="form-grid compact">
            <label>
              특허 유형
              <select value={draft.type} onChange={(event) => onUpdateDraft('type', event.target.value)}>
                <option>국내 출원</option>
                <option>국내 등록</option>
                <option>해외 출원</option>
                <option>해외 등록</option>
              </select>
            </label>
            <label>
              적용 제품
              <input value={draft.product} onChange={(event) => onUpdateDraft('product', event.target.value)} />
            </label>
          </div>
          <label>
            발명의 명칭
            <input value={draft.title} onChange={(event) => onUpdateDraft('title', event.target.value)} />
          </label>
          <div className="form-grid compact">
            <label>
              출원번호
              <input value={draft.applicationNo} onChange={(event) => onUpdateDraft('applicationNo', event.target.value)} />
            </label>
            <label>
              출원일
              <input type="date" value={draft.applicationDate} onChange={(event) => onUpdateDraft('applicationDate', event.target.value)} />
            </label>
            <label>
              등록번호
              <input value={draft.registrationNo} onChange={(event) => onUpdateDraft('registrationNo', event.target.value)} />
            </label>
            <label>
              등록일
              <input value={draft.registrationDate} onChange={(event) => onUpdateDraft('registrationDate', event.target.value)} />
            </label>
          </div>
          <label>
            요약 정보
            <textarea value={draft.summary} onChange={(event) => onUpdateDraft('summary', event.target.value)} />
          </label>
          <FileAttachmentEditor
            files={draft.specification}
            label="명세서 등 증빙"
            onChange={(files) => onUpdateDraft('specification', files.join(', '))}
          />
          <label>
            이력
            <textarea value={(draft.history ?? []).join('\n')} onChange={(event) => onUpdateDraft('history', event.target.value.split('\n').filter(Boolean))} />
          </label>
          <div className="button-row modal-actions sticky-modal-actions">
            <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
            <button className="primary-action stretch" type="submit">저장</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function BudgetOverviewPanel({
  rows,
  projectFilter,
  yearFilter,
  selectedId,
  draft,
  onProjectFilterChange,
  onYearFilterChange,
  onSelect,
  onUpdateDraft,
  onSave,
  onAddNew,
  onDeleteBudgetRows,
  onExportCsv,
  equipmentItems,
  selectedEquipmentId,
  onSelectEquipment,
  onUpdateEquipmentItem,
  onUpdateEquipmentQuote,
  onUpdateEquipmentSpec,
  onRenameEquipmentSpec,
  onAddEquipmentSpec,
  onAddEquipment,
  onDeleteEquipmentItems,
}) {
  const [isBudgetEditOpen, setBudgetEditOpen] = useState(false);
  const [isEquipmentEditOpen, setEquipmentEditOpen] = useState(false);
  const safeRows = Array.isArray(rows) ? rows.filter((row) => row && typeof row === 'object') : [];
  const safeDraft = draft && typeof draft === 'object' ? draft : createEmptyBudgetRow();
  const projects = ['전체 과제', ...Array.from(new Set(safeRows.map((row) => row.project).filter(Boolean)))];
  const years = ['전체 연도', ...Array.from(new Set(safeRows.map((row) => row.year).filter(Boolean))).sort()];
  const visibleRows = safeRows.filter((row) => {
    const projectMatch = projectFilter === '전체 과제' || row.project === projectFilter;
    const yearMatch = yearFilter === '전체 연도' || row.year === yearFilter;
    return projectMatch && yearMatch;
  });
  const budgetSelection = useRowSelection(visibleRows);
  const totals = budgetAmountKeys.reduce(
    (acc, item) => ({ ...acc, [item.key]: visibleRows.reduce((sum, row) => sum + (Number(row[item.key]) || 0), 0) }),
    {}
  );
  const grandTotal = visibleRows.reduce((sum, row) => sum + getBudgetTotal(row), 0);
  const safeEquipmentItems = Array.isArray(equipmentItems) ? equipmentItems.map(normalizeEquipmentItem) : [];
  const equipmentSelection = useRowSelection(safeEquipmentItems);
  const selectedEquipment = safeEquipmentItems.find((item) => item.id === selectedEquipmentId) ?? safeEquipmentItems[0];
  const selectedQuotes = selectedEquipment?.quotes ?? [];
  const selectedQuoteSpecs = selectedEquipment?.quoteSpecs ?? [];
  const equipmentGroups = ['구매 완료', '진행 중', '진행 예정'];
  const requiredCompleteFields = [
    ['name', '장비명'],
    ['vendor', '업체명'],
    ['model', '모델명'],
    ['purchaseDate', '구매일자'],
    ['receivedDate', '입고일자'],
    ['contractDate', '계약일자'],
    ['price', '구매가'],
    ['note', '비고'],
  ];
  const missingCompleteFields = selectedEquipment?.status === '구매 완료'
    ? requiredCompleteFields.filter(([key]) => !selectedEquipment[key]).map(([, label]) => label)
    : [];
  const quoteColumns = selectedEquipment
    ? [
        { key: 'label', label: '항목' },
        ...selectedQuotes.map((_, index) => ({ key: `vendor${index}`, label: `업체 ${index + 1}` })),
      ]
    : [];
  const quoteRows = selectedEquipment
    ? [
        {
          label: '모델명',
          ...Object.fromEntries(selectedQuotes.map((quote, index) => [`vendor${index}`, quote.model])),
        },
        {
          label: '업체명',
          ...Object.fromEntries(selectedQuotes.map((quote, index) => [`vendor${index}`, quote.vendor])),
        },
        {
          label: '초기 견적가',
          ...Object.fromEntries(selectedQuotes.map((quote, index) => [`vendor${index}`, quote.firstPrice])),
        },
        {
          label: '최종 견적가',
          ...Object.fromEntries(selectedQuotes.map((quote, index) => [`vendor${index}`, quote.finalPrice])),
        },
        ...selectedQuoteSpecs.map((spec) => ({
          label: spec,
          ...Object.fromEntries(selectedQuotes.map((quote, index) => [`vendor${index}`, quote.specs?.[spec] ?? ''])),
        })),
      ]
    : [];

  function handleAddBudget() {
    onAddNew();
    setBudgetEditOpen(true);
  }

  function handleSaveBudget(event) {
    const saved = onSave(event);
    if (saved !== false) setBudgetEditOpen(false);
  }

  function handleAddEquipment() {
    onAddEquipment(createEmptyEquipmentItem());
    setEquipmentEditOpen(true);
  }

  return (
    <div className="budget-equipment-workspace">
      <section className="module-table-panel">
        <div className="section-heading">
          <div>
            <h3>연구비 총괄표</h3>
            <p>과제별·연도별 연구비 현황을 주요 비목 기준으로 확인합니다.</p>
          </div>
          <div className="section-actions">
            <button
              onClick={() =>
                onExportCsv(
                  '연구비총괄표.csv',
                  budgetCsvColumns,
                  visibleRows.map((row) => ({ ...row, total: getBudgetTotal(row) }))
                )
              }
              type="button"
            >
              <Download size={14} />
              CSV
            </button>
            <button onClick={handleAddBudget} type="button">
              <Plus size={14} />
              예산행 추가
            </button>
            <DeleteSelectedButton
              count={budgetSelection.selectedCount}
              label="예산행 삭제"
              onClick={() => {
                onDeleteBudgetRows(budgetSelection.selectedIds);
                budgetSelection.clear();
              }}
            />
          </div>
        </div>

        <div className="budget-filter-row">
          <select value={projectFilter} onChange={(event) => onProjectFilterChange(event.target.value)}>
            {projects.map((project) => (
              <option key={project}>{project}</option>
            ))}
          </select>
          <select value={yearFilter} onChange={(event) => onYearFilterChange(event.target.value)}>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="budget-summary-row">
          <article>
            <span>조회 총액</span>
            <strong>{formatWon(grandTotal)}</strong>
          </article>
          <article>
            <span>연구장비비</span>
            <strong>{formatWon(totals.equipment)}</strong>
          </article>
          <article>
            <span>인건비</span>
            <strong>{formatWon(totals.labor)}</strong>
          </article>
          <article>
            <span>간접비</span>
            <strong>{formatWon(totals.overhead)}</strong>
          </article>
        </div>

        <div className="budget-layout">
          <div className="data-table-shell">
            <table className="data-table budget-table">
              <thead>
                <tr>
                  <SelectionHeader label="연구비 총괄표" selection={budgetSelection} />
                  <th>과제</th>
                  <th>연도</th>
                  {budgetAmountKeys.map((item) => (
                    <th key={item.key}>{item.label}</th>
                  ))}
                  <th>합계</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row.id} className={selectedId === row.id ? 'selected' : ''} onClick={() => onSelect(row)}>
                    <SelectionCell
                      checked={budgetSelection.isSelected(row.id)}
                      label={`${row.project} ${row.year} 선택`}
                      onChange={() => budgetSelection.toggleRow(row.id)}
                    />
                    <td className="strong-cell">{row.project}</td>
                    <td>{row.year}</td>
                    {budgetAmountKeys.map((item) => (
                      <td key={item.key}>{formatWon(row[item.key])}</td>
                    ))}
                    <td className="strong-cell">{formatWon(getBudgetTotal(row))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="fixed-info-panel">
            <div className="fixed-info-head">
              <div>
                <h4>{safeDraft.project}</h4>
                <p>{safeDraft.year}년도 연구비 총괄</p>
              </div>
              <button onClick={() => setBudgetEditOpen(true)} type="button">연구비 수정</button>
            </div>
            <div className="fixed-info-grid">
              {budgetAmountKeys.map((item) => (
                <article key={item.key}><span>{item.label}</span><strong>{formatWon(safeDraft[item.key])}</strong></article>
              ))}
            </div>
            <div className="budget-total-box">
              <span>합계</span>
              <strong>{formatWon(getBudgetTotal(safeDraft))}</strong>
            </div>
          </aside>
        </div>
      </section>

      {selectedEquipment && (
        <section className="module-table-panel equipment-panel">
          <div className="section-heading">
            <div>
              <h3>장비 도입 현황</h3>
              <p>구매 완료, 진행 중, 진행 예정 장비를 분류하고 세부 도입 정보를 관리합니다.</p>
            </div>
            <div className="section-actions">
              <button onClick={() => onExportCsv('장비도입현황.csv', equipmentCsvColumns, safeEquipmentItems)} type="button">
                <Download size={14} />
                CSV
              </button>
              <button onClick={handleAddEquipment} type="button">
                <Plus size={14} />
                장비 추가
              </button>
              <DeleteSelectedButton
                count={equipmentSelection.selectedCount}
                label="장비 삭제"
                onClick={() => {
                  onDeleteEquipmentItems(equipmentSelection.selectedIds);
                  equipmentSelection.clear();
                }}
              />
            </div>
          </div>

          <div className="data-table-shell">
            <table className="data-table equipment-list-table">
              <thead>
                <tr>
                  <SelectionHeader label="장비 도입 현황" selection={equipmentSelection} />
                  <th>구분</th>
                  <th>업무 범주</th>
                  <th>담당자</th>
                  <th>장비명</th>
                  <th>업체명</th>
                  <th>모델명</th>
                  <th>구매일자</th>
                  <th>입고일자</th>
                  <th>계약일자</th>
                  <th>구매가(VAT 제외)</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                {safeEquipmentItems.map((item) => (
                  <tr key={item.id} className={selectedEquipment.id === item.id ? 'selected' : ''} onClick={() => onSelectEquipment(item.id)}>
                    <SelectionCell
                      checked={equipmentSelection.isSelected(item.id)}
                      label={`${item.name || '장비'} 선택`}
                      onChange={() => equipmentSelection.toggleRow(item.id)}
                    />
                    <td><span className="stage-chip">{item.status}</span></td>
                    <td>{item.workCategory}</td>
                    <td>{item.owner}</td>
                    <td className="strong-cell">{displayValue(item.name, '장비명 입력')}</td>
                    <td>{displayValue(item.vendor)}</td>
                    <td>{displayValue(item.model)}</td>
                    <td>{displayValue(item.purchaseDate)}</td>
                    <td>{displayValue(item.receivedDate)}</td>
                    <td>{displayValue(item.contractDate)}</td>
                    <td>{item.price ? formatWon(item.price) : '-'}</td>
                    <td>{displayValue(item.note)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="equipment-detail-grid">
            <article className="fixed-info-panel equipment-readonly-detail">
              <div className="fixed-info-head">
                <div>
                  <h4>{selectedEquipment.name || '장비 세부 정보'}</h4>
                  <p>{selectedEquipment.status} · {displayValue(selectedEquipment.vendor, '업체 미정')}</p>
                </div>
                <button onClick={() => setEquipmentEditOpen(true)} type="button">장비 정보 수정</button>
              </div>
              <div className="fixed-info-grid">
                <article><span>모델명</span><strong>{displayValue(selectedEquipment.model, '모델 미정')}</strong></article>
                <article><span>업무범주</span><strong>{displayValue(selectedEquipment.workCategory)}</strong></article>
                <article><span>담당자</span><strong>{displayValue(selectedEquipment.owner)}</strong></article>
                <article><span>구매일자</span><strong>{displayValue(selectedEquipment.purchaseDate)}</strong></article>
                <article><span>입고일자</span><strong>{displayValue(selectedEquipment.receivedDate)}</strong></article>
                <article><span>계약일자</span><strong>{displayValue(selectedEquipment.contractDate)}</strong></article>
                <article><span>구매가(VAT 제외)</span><strong>{selectedEquipment.price ? formatWon(selectedEquipment.price) : '-'}</strong></article>
                <article><span>비고</span><strong>{displayValue(selectedEquipment.note)}</strong></article>
              </div>
              <div className="fixed-section">
                <h5>세부 내용</h5>
                <p>{displayValue(selectedEquipment.details, '등록된 세부 내용이 없습니다.')}</p>
              </div>
              <div className={missingCompleteFields.length ? 'equipment-validation warn' : 'equipment-validation'}>
                {selectedEquipment.status === '구매 완료'
                  ? missingCompleteFields.length
                    ? `구매 완료 항목 필수값: ${missingCompleteFields.join(', ')}`
                    : '구매 완료 필수 항목이 모두 입력되었습니다.'
                  : '진행 중/진행 예정 항목은 장비명부터 단계적으로 입력할 수 있습니다.'}
              </div>
            </article>

            <article className="module-table-panel quote-panel">
              <div className="section-heading">
                <div>
                  <h3>비교견적표</h3>
                  <p>진행 중 장비는 최소 3개 업체 견적을 같은 행 기준으로 비교합니다.</p>
                </div>
                <div className="section-actions">
                  <button onClick={() => setEquipmentEditOpen(true)} type="button">견적 수정</button>
                  <button onClick={() => onExportCsv('비교견적표.csv', quoteColumns, quoteRows)} type="button">
                    <Download size={14} />
                    CSV
                  </button>
                </div>
              </div>
              <div className="data-table-shell">
                <table className="data-table quote-table">
                  <thead>
                    <tr>
                      <th>항목</th>
                      {selectedQuotes.map((quote, index) => (
                        <th key={`${quote.vendor}-${index}`}>업체 {index + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="strong-cell">모델명</td>
                      {selectedQuotes.map((quote, index) => (
                        <td key={`model-${index}`}>{displayValue(quote.model)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="strong-cell">업체명</td>
                      {selectedQuotes.map((quote, index) => (
                        <td key={`vendor-${index}`}>{displayValue(quote.vendor)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="strong-cell">초기 견적가</td>
                      {selectedQuotes.map((quote, index) => (
                        <td key={`first-${index}`}>{quote.firstPrice ? formatWon(quote.firstPrice) : '-'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="strong-cell">최종 견적가</td>
                      {selectedQuotes.map((quote, index) => (
                        <td key={`final-${index}`}>{quote.finalPrice ? formatWon(quote.finalPrice) : '-'}</td>
                      ))}
                    </tr>
                    {selectedQuoteSpecs.map((spec) => (
                      <tr key={spec}>
                        <td className="strong-cell">{spec}</td>
                        {selectedQuotes.map((quote, index) => (
                          <td key={`${spec}-${index}`}>{displayValue(quote.specs?.[spec])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </section>
      )}

      {isBudgetEditOpen && (
        <BudgetEditModal
          draft={safeDraft}
          onClose={() => setBudgetEditOpen(false)}
          onSave={handleSaveBudget}
          onUpdateDraft={onUpdateDraft}
        />
      )}

      {isEquipmentEditOpen && selectedEquipment && (
        <EquipmentEditModal
          equipmentGroups={equipmentGroups}
          item={selectedEquipment}
          missingCompleteFields={missingCompleteFields}
          onAddEquipmentSpec={onAddEquipmentSpec}
          onClose={() => setEquipmentEditOpen(false)}
          onExportCsv={onExportCsv}
          onUpdateEquipmentItem={onUpdateEquipmentItem}
          onUpdateEquipmentQuote={onUpdateEquipmentQuote}
          onUpdateEquipmentSpec={onUpdateEquipmentSpec}
          onRenameEquipmentSpec={onRenameEquipmentSpec}
          quoteColumns={quoteColumns}
          quoteRows={quoteRows}
        />
      )}
    </div>
  );
}

function BudgetEditModal({ draft, onUpdateDraft, onSave, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal edit-modal" role="dialog" aria-modal="true" aria-labelledby="budget-edit-title">
        <div className="modal-header">
          <div>
            <h2 id="budget-edit-title">연구비 입력</h2>
            <p>저장하면 연구비 총괄표와 우측 요약에 고정 정보로 표시됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <form className="data-entry-form edit-modal-body" onSubmit={onSave}>
          <div className="form-grid compact">
            <label>
              과제
              <input value={draft.project} onChange={(event) => onUpdateDraft('project', event.target.value)} />
            </label>
            <label>
              연도
              <input value={draft.year} onChange={(event) => onUpdateDraft('year', event.target.value)} />
            </label>
          </div>
          <div className="budget-input-grid">
            {budgetAmountKeys.map((item) => (
              <label key={item.key}>
                {item.label}
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={draft[item.key]}
                  onChange={(event) => onUpdateDraft(item.key, Number(event.target.value))}
                />
              </label>
            ))}
          </div>
          <div className="budget-total-box">
            <span>합계</span>
            <strong>{formatWon(getBudgetTotal(draft))}</strong>
          </div>
          <div className="button-row modal-actions sticky-modal-actions">
            <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
            <button className="primary-action stretch" type="submit">저장</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function EquipmentEditModal({
  equipmentGroups,
  item,
  missingCompleteFields,
  onAddEquipmentSpec,
  onClose,
  onExportCsv,
  onUpdateEquipmentItem,
  onUpdateEquipmentQuote,
  onUpdateEquipmentSpec,
  onRenameEquipmentSpec,
  quoteColumns,
  quoteRows,
}) {
  const categoryOptions = getWorkCategoryOptions('budget', '예산·장비');

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal equipment-edit-modal" role="dialog" aria-modal="true" aria-labelledby="equipment-edit-title">
        <div className="modal-header">
          <div>
            <h2 id="equipment-edit-title">장비 도입 정보 입력</h2>
            <p>장비 기본 정보와 비교견적을 이 창에서만 수정합니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <div className="equipment-edit-body">
          <form className="data-entry-form equipment-detail-form">
            <h4>{item.name || '장비 세부 정보'}</h4>
            <div className="form-grid compact">
              <label>
                구분
                <select value={item.status} onChange={(event) => onUpdateEquipmentItem(item.id, 'status', event.target.value)}>
                  {equipmentGroups.map((group) => <option key={group}>{group}</option>)}
                </select>
              </label>
              <label>
                담당자
                <select value={item.owner} onChange={(event) => onUpdateEquipmentItem(item.id, 'owner', event.target.value)}>
                  {members.map((member) => (
                    <option key={member.name}>{member.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-field-block">
              <span>업무범주</span>
              <div className="category-toggle-grid" role="group" aria-label="장비 업무범주 선택">
                {categoryOptions.map((category) => (
                  <button
                    className={item.workCategory === category ? 'active' : ''}
                    key={category}
                    onClick={() => onUpdateEquipmentItem(item.id, 'workCategory', category)}
                    type="button"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-grid compact">
              <label>
                장비명
                <input value={item.name} onChange={(event) => onUpdateEquipmentItem(item.id, 'name', event.target.value)} />
              </label>
              <label>
                업체명
                <input value={item.vendor} onChange={(event) => onUpdateEquipmentItem(item.id, 'vendor', event.target.value)} />
              </label>
              <label>
                모델명
                <input value={item.model} onChange={(event) => onUpdateEquipmentItem(item.id, 'model', event.target.value)} />
              </label>
              <label>
                구매일자
                <input type="date" value={item.purchaseDate} onChange={(event) => onUpdateEquipmentItem(item.id, 'purchaseDate', event.target.value)} />
              </label>
              <label>
                입고일자
                <input type="date" value={item.receivedDate} onChange={(event) => onUpdateEquipmentItem(item.id, 'receivedDate', event.target.value)} />
              </label>
              <label>
                계약일자
                <input type="date" value={item.contractDate} onChange={(event) => onUpdateEquipmentItem(item.id, 'contractDate', event.target.value)} />
              </label>
              <label>
                구매가(VAT 제외)
                <input type="number" min="0" step="10000" value={item.price} onChange={(event) => onUpdateEquipmentItem(item.id, 'price', event.target.value)} />
              </label>
            </div>
            <label>
              비고
              <input value={item.note} onChange={(event) => onUpdateEquipmentItem(item.id, 'note', event.target.value)} />
            </label>
            <label>
              세부 내용
              <textarea value={item.details} onChange={(event) => onUpdateEquipmentItem(item.id, 'details', event.target.value)} />
            </label>
            <div className={missingCompleteFields.length ? 'equipment-validation warn' : 'equipment-validation'}>
              {item.status === '구매 완료'
                ? missingCompleteFields.length
                  ? `구매 완료 항목 필수값: ${missingCompleteFields.join(', ')}`
                  : '구매 완료 필수 항목이 모두 입력되었습니다.'
                : '진행 중/진행 예정 항목은 장비명부터 단계적으로 입력할 수 있습니다.'}
            </div>
          </form>

          <article className="module-table-panel quote-panel">
            <div className="section-heading">
              <div>
                <h3>비교견적표</h3>
                <p>최소 3개 업체 견적을 같은 행 기준으로 입력합니다.</p>
              </div>
              <div className="section-actions">
                <button onClick={() => onAddEquipmentSpec(item.id)} type="button">
                  <Plus size={14} />
                  스펙 행
                </button>
                <button onClick={() => onExportCsv('비교견적표.csv', quoteColumns, quoteRows)} type="button">
                  <Download size={14} />
                  CSV
                </button>
              </div>
            </div>
            <div className="data-table-shell">
              <table className="data-table quote-table">
                <thead>
                  <tr>
                    <th>항목</th>
                    {item.quotes.map((quote, index) => (
                      <th key={`${quote.vendor}-${index}`}>업체 {index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="strong-cell">모델명</td>
                    {item.quotes.map((quote, index) => (
                      <td key={`edit-model-${index}`}>
                        <input className="cell-input" value={quote.model} onChange={(event) => onUpdateEquipmentQuote(item.id, index, 'model', event.target.value)} />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="strong-cell">업체명</td>
                    {item.quotes.map((quote, index) => (
                      <td key={`edit-vendor-${index}`}>
                        <input className="cell-input" value={quote.vendor} onChange={(event) => onUpdateEquipmentQuote(item.id, index, 'vendor', event.target.value)} />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="strong-cell">초기 견적가</td>
                    {item.quotes.map((quote, index) => (
                      <td key={`edit-first-${index}`}>
                        <input className="cell-input" type="number" min="0" value={quote.firstPrice} onChange={(event) => onUpdateEquipmentQuote(item.id, index, 'firstPrice', event.target.value)} />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="strong-cell">최종 견적가</td>
                    {item.quotes.map((quote, index) => (
                      <td key={`edit-final-${index}`}>
                        <input className="cell-input" type="number" min="0" value={quote.finalPrice} onChange={(event) => onUpdateEquipmentQuote(item.id, index, 'finalPrice', event.target.value)} />
                      </td>
                    ))}
                  </tr>
                  {item.quoteSpecs.map((spec) => (
                    <tr key={spec}>
                      <td className="strong-cell">
                        <input
                          className="cell-input quote-spec-name-input"
                          value={spec}
                          onChange={(event) => onRenameEquipmentSpec(item.id, spec, event.target.value)}
                        />
                      </td>
                      {item.quotes.map((quote, index) => (
                        <td key={`edit-${spec}-${index}`}>
                          <input
                            className="cell-input"
                            value={quote.specs?.[spec] ?? ''}
                            onChange={(event) => onUpdateEquipmentSpec(item.id, index, spec, event.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
        <div className="button-row modal-actions sticky-modal-actions">
          <button className="primary-action stretch" onClick={onClose} type="button">닫기</button>
        </div>
      </section>
    </div>
  );
}

function OutcomeRoyaltyTable({ rows, onAddRow, onSaveRow, onDeleteRows, onExportCsv }) {
  const [isAddOpen, setAddOpen] = useState(false);
  const [editDraft, setEditDraft] = useState(null);
  const rowSelection = useRowSelection(rows);

  return (
    <section className="module-table-panel">
      <div className="section-heading">
        <div>
          <h3>성과·기술료 목록</h3>
          <p>정부, 연구소, 대학 기준 기술료 납부 현황을 표로 관리합니다.</p>
        </div>
        <div className="section-actions">
          <button onClick={() => onExportCsv('성과기술료목록.csv', royaltyCsvColumns, rows)} type="button">
            <Download size={14} />
            CSV
          </button>
          <button onClick={() => setAddOpen(true)} type="button">
            <Plus size={14} />
            성과 추가
          </button>
          <DeleteSelectedButton
            count={rowSelection.selectedCount}
            onClick={() => {
              onDeleteRows(rowSelection.selectedIds);
              rowSelection.clear();
            }}
          />
        </div>
      </div>
      <div className="data-table-shell">
        <table className="data-table royalty-table">
          <thead>
            <tr>
              <SelectionHeader label="성과·기술료 목록" selection={rowSelection} />
              <th>구분</th>
              <th>업무 범주</th>
              <th>기관명</th>
              <th>과제명</th>
              <th>담당자</th>
              <th>기술요율</th>
              <th>납부 기간</th>
              <th>전년도 매출액</th>
              <th>당해년도 납부액</th>
              <th>당해년도 납부 마감일</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <SelectionCell
                  checked={rowSelection.isSelected(row.id)}
                  label={`${row.project} 선택`}
                  onChange={() => rowSelection.toggleRow(row.id)}
                />
                <td><span className="stage-chip">{row.type}</span></td>
                <td>{row.workCategory}</td>
                <td>{row.institution}</td>
                <td className="strong-cell">{row.project}</td>
                <td>{row.owner}</td>
                <td>{row.rate}</td>
                <td>{row.period}</td>
                <td>{row.lastSales}</td>
                <td>{row.dueAmount}</td>
                <td>{row.dueDate}</td>
                <td>
                  <button className="card-close-action row-edit-action" onClick={() => setEditDraft(row)} type="button">수정</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAddOpen && (
        <RoyaltyAddModal
          onAddRow={(row) => {
            onAddRow(row);
            setAddOpen(false);
          }}
          onClose={() => setAddOpen(false)}
        />
      )}
      {editDraft && (
        <RoyaltyEditModal
          row={editDraft}
          onClose={() => setEditDraft(null)}
          onSaveRow={(row) => {
            onSaveRow(row);
            setEditDraft(null);
          }}
        />
      )}
    </section>
  );
}

function RoyaltyAddModal({ onAddRow, onClose }) {
  const [draft, setDraft] = useState(createEmptyRoyaltyRow);
  const categoryOptions = getWorkCategoryOptions('outcome', '성과·기술료');

  function updateDraft(field, value) {
    setDraft((row) => ({ ...row, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.project.trim()) return;
    onAddRow(draft);
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal edit-modal" role="dialog" aria-modal="true" aria-labelledby="royalty-add-title">
        <div className="modal-header">
          <div>
            <h2 id="royalty-add-title">성과·기술료 추가</h2>
            <p>저장하면 성과·기술료 목록에 고정 정보로 표시됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <form className="data-entry-form edit-modal-body" onSubmit={handleSubmit}>
          <div className="form-grid compact">
            <label>
              구분
              <select value={draft.type} onChange={(event) => updateDraft('type', event.target.value)}>
                <option>정부</option>
                <option>연구소</option>
                <option>대학</option>
              </select>
            </label>
            <label>
              기술요율
              <input value={draft.rate} onChange={(event) => updateDraft('rate', event.target.value)} placeholder="예: 2.5%" />
            </label>
            <label>
              기관명
              <input value={draft.institution} onChange={(event) => updateDraft('institution', event.target.value)} />
            </label>
            <label>
              담당자
              <select value={draft.owner} onChange={(event) => updateDraft('owner', event.target.value)}>
                {members.map((member) => (
                  <option key={member.name}>{member.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-field-block">
            <span>업무범주</span>
            <div className="category-toggle-grid" role="group" aria-label="성과·기술료 업무범주 선택">
              {categoryOptions.map((category) => (
                <button
                  className={draft.workCategory === category ? 'active' : ''}
                  key={category}
                  onClick={() => updateDraft('workCategory', category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <label>
            과제명
            <input value={draft.project} onChange={(event) => updateDraft('project', event.target.value)} />
          </label>
          <div className="form-grid compact">
            <label>
              납부 기간
              <input value={draft.period} onChange={(event) => updateDraft('period', event.target.value)} placeholder="예: 2026.07~2026.09" />
            </label>
            <label>
              당해년도 납부 마감일
              <input type="date" value={draft.dueDate} onChange={(event) => updateDraft('dueDate', event.target.value)} />
            </label>
            <label>
              전년도 매출액
              <input value={draft.lastSales} onChange={(event) => updateDraft('lastSales', event.target.value)} />
            </label>
            <label>
              당해년도 납부액
              <input value={draft.dueAmount} onChange={(event) => updateDraft('dueAmount', event.target.value)} />
            </label>
          </div>
          <div className="button-row modal-actions sticky-modal-actions">
            <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
            <button className="primary-action stretch" type="submit">저장</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function RoyaltyEditModal({ row, onSaveRow, onClose }) {
  const [draft, setDraft] = useState(() => ({
    ...row,
    type: row.type ?? '정부',
    project: row.project ?? '',
    owner: row.owner ?? members[0]?.name ?? '',
    institution: row.institution ?? '',
    rate: row.rate ?? '',
    period: row.period ?? '',
    lastSales: row.lastSales ?? '',
    dueAmount: row.dueAmount ?? '',
    dueDate: row.dueDate ?? '',
    workCategory: normalizeWorkCategory('outcome', '성과·기술료', row.workCategory),
  }));
  const categoryOptions = getWorkCategoryOptions('outcome', '성과·기술료');

  function updateDraft(field, value) {
    setDraft((item) => ({ ...item, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.project.trim()) return;
    onSaveRow({
      ...draft,
      workCategory: normalizeWorkCategory('outcome', '성과·기술료', draft.workCategory),
    });
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal edit-modal" role="dialog" aria-modal="true" aria-labelledby="royalty-edit-title">
        <div className="modal-header">
          <div>
            <h2 id="royalty-edit-title">성과·기술료 수정</h2>
            <p>저장하면 목록과 세부 업무량 현황의 범주가 함께 갱신됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <form className="data-entry-form edit-modal-body" onSubmit={handleSubmit}>
          <div className="form-grid compact">
            <label>
              구분
              <select value={draft.type} onChange={(event) => updateDraft('type', event.target.value)}>
                <option>정부</option>
                <option>연구소</option>
                <option>대학</option>
              </select>
            </label>
            <label>
              기술요율
              <input value={draft.rate} onChange={(event) => updateDraft('rate', event.target.value)} placeholder="예: 2.5%" />
            </label>
            <label>
              기관명
              <input value={draft.institution} onChange={(event) => updateDraft('institution', event.target.value)} />
            </label>
            <label>
              담당자
              <select value={draft.owner} onChange={(event) => updateDraft('owner', event.target.value)}>
                {members.map((member) => (
                  <option key={member.name}>{member.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-field-block">
            <span>업무범주</span>
            <div className="category-toggle-grid" role="group" aria-label="성과·기술료 업무범주 선택">
              {categoryOptions.map((category) => (
                <button
                  className={draft.workCategory === category ? 'active' : ''}
                  key={category}
                  onClick={() => updateDraft('workCategory', category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <label>
            과제명
            <input value={draft.project} onChange={(event) => updateDraft('project', event.target.value)} />
          </label>
          <div className="form-grid compact">
            <label>
              납부 기간
              <input value={draft.period} onChange={(event) => updateDraft('period', event.target.value)} placeholder="예: 2026.07~2026.09" />
            </label>
            <label>
              당해년도 납부 마감일
              <input type="date" value={draft.dueDate} onChange={(event) => updateDraft('dueDate', event.target.value)} />
            </label>
            <label>
              전년도 매출액
              <input value={draft.lastSales} onChange={(event) => updateDraft('lastSales', event.target.value)} />
            </label>
            <label>
              당해년도 납부액
              <input value={draft.dueAmount} onChange={(event) => updateDraft('dueAmount', event.target.value)} />
            </label>
          </div>
          <div className="button-row modal-actions sticky-modal-actions">
            <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
            <button className="primary-action stretch" type="submit">저장</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function LabAdminTable({ rows, onAddRow, onSaveRow, onDeleteRows, onExportCsv }) {
  const [isAddOpen, setAddOpen] = useState(false);
  const [editDraft, setEditDraft] = useState(null);
  const rowSelection = useRowSelection(rows);

  return (
    <section className="module-table-panel">
      <div className="section-heading">
        <div>
          <h3>연구소 행정 목록</h3>
          <p>법정의무와 자체수행 업무를 담당자, 유관기관, URL 기준으로 관리합니다.</p>
        </div>
        <div className="section-actions">
          <button onClick={() => onExportCsv('연구소행정목록.csv', labAdminCsvColumns, rows)} type="button">
            <Download size={14} />
            CSV
          </button>
          <button onClick={() => setAddOpen(true)} type="button">
            <Plus size={14} />
            행정 추가
          </button>
          <DeleteSelectedButton
            count={rowSelection.selectedCount}
            onClick={() => {
              onDeleteRows(rowSelection.selectedIds);
              rowSelection.clear();
            }}
          />
        </div>
      </div>
      <div className="data-table-shell">
        <table className="data-table lab-admin-table">
          <thead>
            <tr>
              <SelectionHeader label="연구소 행정 목록" selection={rowSelection} />
              <th>구분</th>
              <th>업무 범주</th>
              <th>업무명</th>
              <th>담당자</th>
              <th>유관기관</th>
              <th>URL</th>
              <th>상태</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <SelectionCell
                  checked={rowSelection.isSelected(row.id)}
                  label={`${row.task} 선택`}
                  onChange={() => rowSelection.toggleRow(row.id)}
                />
                <td><span className="stage-chip">{row.type}</span></td>
                <td>{row.workCategory}</td>
                <td className="strong-cell">{row.task}</td>
                <td>{row.owner}</td>
                <td>{row.institution}</td>
                <td>{row.url}</td>
                <td><span className="stage-chip">{row.status}</span></td>
                <td>
                  <button className="card-close-action row-edit-action" onClick={() => setEditDraft(row)} type="button">수정</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAddOpen && (
        <LabAdminAddModal
          onAddRow={(row) => {
            onAddRow(row);
            setAddOpen(false);
          }}
          onClose={() => setAddOpen(false)}
        />
      )}
      {editDraft && (
        <LabAdminEditModal
          row={editDraft}
          onClose={() => setEditDraft(null)}
          onSaveRow={(row) => {
            onSaveRow(row);
            setEditDraft(null);
          }}
        />
      )}
    </section>
  );
}

function LabAdminAddModal({ onAddRow, onClose }) {
  const [draft, setDraft] = useState(createEmptyLabAdminRow);
  const categoryOptions = getWorkCategoryOptions('labadmin', '연구소 행정');

  function updateDraft(field, value) {
    setDraft((row) => ({ ...row, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.task.trim()) return;
    onAddRow(draft);
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal edit-modal" role="dialog" aria-modal="true" aria-labelledby="lab-admin-add-title">
        <div className="modal-header">
          <div>
            <h2 id="lab-admin-add-title">연구소 행정 추가</h2>
            <p>저장하면 연구소 행정 목록에 고정 정보로 표시됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <form className="data-entry-form edit-modal-body" onSubmit={handleSubmit}>
          <div className="form-grid compact">
            <label>
              구분
              <select value={draft.type} onChange={(event) => updateDraft('type', event.target.value)}>
                <option>법정의무</option>
                <option>자체수행</option>
              </select>
            </label>
            <label>
              상태
              <select value={draft.status} onChange={(event) => updateDraft('status', event.target.value)}>
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-field-block">
            <span>업무범주</span>
            <div className="category-toggle-grid" role="group" aria-label="연구소 행정 업무범주 선택">
              {categoryOptions.map((category) => (
                <button
                  className={draft.workCategory === category ? 'active' : ''}
                  key={category}
                  onClick={() => updateDraft('workCategory', category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <label>
            업무명
            <input value={draft.task} onChange={(event) => updateDraft('task', event.target.value)} />
          </label>
          <div className="form-grid compact">
            <label>
              담당자
              <select value={draft.owner} onChange={(event) => updateDraft('owner', event.target.value)}>
                {members.map((member) => (
                  <option key={member.name}>{member.name}</option>
                ))}
              </select>
            </label>
            <label>
              유관기관
              <input value={draft.institution} onChange={(event) => updateDraft('institution', event.target.value)} />
            </label>
          </div>
          <label>
            URL
            <input value={draft.url} onChange={(event) => updateDraft('url', event.target.value)} />
          </label>
          <div className="button-row modal-actions sticky-modal-actions">
            <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
            <button className="primary-action stretch" type="submit">저장</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function LabAdminEditModal({ row, onSaveRow, onClose }) {
  const [draft, setDraft] = useState(() => ({
    ...row,
    type: row.type ?? '법정의무',
    task: row.task ?? '',
    owner: row.owner ?? members[0]?.name ?? '',
    institution: row.institution ?? '',
    url: row.url ?? '',
    status: row.status ?? '계획',
    workCategory: normalizeWorkCategory('labadmin', '연구소 행정', row.workCategory),
  }));
  const categoryOptions = getWorkCategoryOptions('labadmin', '연구소 행정');

  function updateDraft(field, value) {
    setDraft((item) => ({ ...item, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.task.trim()) return;
    onSaveRow({
      ...draft,
      workCategory: normalizeWorkCategory('labadmin', '연구소 행정', draft.workCategory),
    });
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal edit-modal" role="dialog" aria-modal="true" aria-labelledby="lab-admin-edit-title">
        <div className="modal-header">
          <div>
            <h2 id="lab-admin-edit-title">연구소 행정 수정</h2>
            <p>저장하면 연구소 행정 목록과 세부 업무량 현황에 함께 반영됩니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <form className="data-entry-form edit-modal-body" onSubmit={handleSubmit}>
          <div className="form-grid compact">
            <label>
              구분
              <select value={draft.type} onChange={(event) => updateDraft('type', event.target.value)}>
                <option>법정의무</option>
                <option>자체수행</option>
              </select>
            </label>
            <label>
              상태
              <select value={draft.status} onChange={(event) => updateDraft('status', event.target.value)}>
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-field-block">
            <span>업무범주</span>
            <div className="category-toggle-grid" role="group" aria-label="연구소 행정 업무범주 선택">
              {categoryOptions.map((category) => (
                <button
                  className={draft.workCategory === category ? 'active' : ''}
                  key={category}
                  onClick={() => updateDraft('workCategory', category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <label>
            업무명
            <input value={draft.task} onChange={(event) => updateDraft('task', event.target.value)} />
          </label>
          <div className="form-grid compact">
            <label>
              담당자
              <select value={draft.owner} onChange={(event) => updateDraft('owner', event.target.value)}>
                {members.map((member) => (
                  <option key={member.name}>{member.name}</option>
                ))}
              </select>
            </label>
            <label>
              유관기관
              <input value={draft.institution} onChange={(event) => updateDraft('institution', event.target.value)} />
            </label>
          </div>
          <label>
            URL
            <input value={draft.url} onChange={(event) => updateDraft('url', event.target.value)} />
          </label>
          <div className="button-row modal-actions sticky-modal-actions">
            <button className="secondary-action stretch" onClick={onClose} type="button">취소</button>
            <button className="primary-action stretch" type="submit">저장</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function TeamRosterPanel({ items, checkins, onOpenMember, onOpenSummary }) {
  return (
    <section className="team-roster-panel">
      <div className="section-heading">
        <h3>팀 구성원 수행 현황</h3>
        <button onClick={onOpenSummary} type="button">팀 요약 생성</button>
      </div>
      <div className="team-roster-grid">
        {members.map((member) => {
          const memberItems = items.filter((item) => item.owner === member.name || item.coOwner === member.name);
          const memberCheckins = checkins.filter((checkin) => checkin.member === member.name);
          const confirmCount = memberItems.filter((item) => item.risk === '높음').length;
          const dueCount = memberItems.filter((item) => daysLeft(item.due) <= 7).length;
          const blockerCount = memberItems.filter(hasBlocker).length;
          return (
            <button key={member.name} className="member-profile-card" onClick={() => onOpenMember(member.name)} type="button">
              <div className="member-profile-top">
                <span className={`mini-avatar ${member.color}`}>{member.short}</span>
                <div>
                  <strong>{member.name}</strong>
                  <p>{member.role}</p>
                </div>
              </div>
              <p className="member-focus">{member.focus}</p>
              <div className="member-stats">
                <span>업무 {memberItems.length}</span>
                <span>마감 {dueCount}</span>
                <span>확인 {confirmCount}</span>
                <span>보완 {blockerCount}</span>
                <span>입력 {memberCheckins.length}</span>
                <span>{memberCheckins[0]?.status ?? '입력 대기'}</span>
              </div>
              <div className="responsibility-list">
                {member.responsibilities.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function TeamDailyCheckPanel({ items, checkins, onOpenMember, onOpenItem, onAdvanceCheckinStatus, setToast }) {
  const rows = members.map((member) => {
    const memberItems = items.filter((item) => item.owner === member.name || item.coOwner === member.name);
    const latest = checkins.find((checkin) => checkin.member === member.name);
    const linkedItem = latest ? items.find((item) => item.id === latest.itemId) : memberItems[0];
    const blockerCount = memberItems.filter(hasBlocker).length;
    const dueSoon = memberItems.filter((item) => daysLeft(item.due) <= 7).length;
    return {
      member,
      latest,
      linkedItem,
      blockerCount,
      dueSoon,
      inputStatus: latest?.status ?? '입력 대기',
      workStatus: latest?.workStatus ?? linkedItem?.status ?? '업무 선택 필요',
    };
  });
  const waitingCount = rows.filter((row) => row.inputStatus === '입력됨' || row.inputStatus === '입력 대기').length;
  const confirmedCount = rows.filter((row) => row.inputStatus === '확인됨' || row.inputStatus === '보고 반영').length;
  const totalBlockers = rows.reduce((sum, row) => sum + row.blockerCount, 0);

  return (
    <section className="panel team-daily-panel">
      <div className="panel-header">
        <div>
          <h2>오늘의 팀 입력 확인</h2>
          <p>팀원별 최신 체크인, 확인 상태, 막힌 항목을 빠르게 점검합니다.</p>
        </div>
        <button onClick={() => setToast('팀 입력 리마인드 초안을 생성했습니다.')} type="button">리마인드 초안</button>
      </div>

      <div className="team-daily-summary">
        <article>
          <span>확인 필요</span>
          <strong>{waitingCount}명</strong>
        </article>
        <article>
          <span>확인 완료</span>
          <strong>{confirmedCount}명</strong>
        </article>
        <article>
          <span>막힌 항목</span>
          <strong>{totalBlockers}건</strong>
        </article>
      </div>

      <div className="team-daily-list">
        {rows.map((row) => (
          <article key={row.member.name}>
            <div className="team-daily-member">
              <span className={`mini-avatar ${row.member.color}`}>{row.member.short}</span>
              <div>
                <strong>{row.member.name}</strong>
                <p>{row.latest ? row.latest.task : '오늘 입력 대기'}</p>
              </div>
            </div>
            <div className="team-daily-meta">
              <span className="stage-chip">{row.workStatus}</span>
              <span className={row.blockerCount ? 'risk-dot risk-mid' : 'risk-dot risk-low'}>막힘 {row.blockerCount}</span>
              <span className={row.dueSoon ? 'risk-dot risk-high' : 'risk-dot risk-low'}>마감 {row.dueSoon}</span>
            </div>
            <div className="team-daily-actions">
              {row.latest ? (
                <button onClick={() => onAdvanceCheckinStatus(row.latest.id)} type="button">{row.inputStatus}</button>
              ) : (
                <button onClick={() => setToast(`${row.member.name}님에게 오늘 업무 입력 요청을 보냈습니다.`)} type="button">입력 요청</button>
              )}
              <button onClick={() => (row.linkedItem ? onOpenItem(row.linkedItem) : onOpenMember(row.member.name))} type="button">업무 보기</button>
              <button onClick={() => onOpenMember(row.member.name)} type="button">상세</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MemberDetailModal({ member, items, checkins, requests, documents, onClose, chooseItem, setToast, advanceCheckinStatus }) {
  if (!member) return null;
  const ownedItems = items.filter((item) => item.owner === member.name || item.coOwner === member.name);
  const ownedCheckins = checkins.filter((checkin) => checkin.member === member.name);
  const ownedRequests = requests.filter((request) => request.owner === member.name);
  const ownedDocuments = documents.filter((doc) => doc.owner === member.name);
  const blockers = ownedItems.filter((item) => item.blocker && item.blocker !== '-');
  const weeklyDraft = [
    `[${member.name} 주간 업무 입력 초안]`,
    '',
    '1. 이번 주 진행 업무',
    ...(ownedCheckins.length
      ? ownedCheckins.slice(0, 5).map((checkin) => {
          const linkedItem = ownedItems.find((item) => item.id === checkin.itemId);
          return `- ${checkin.task}: ${checkin.workStatus ?? linkedItem?.status ?? checkin.status} / ${checkin.summary}`;
        })
      : ownedItems.slice(0, 5).map((item) => `- ${item.task}: ${item.status} / ${item.nextAction}`)),
    '',
    '2. 막힌 항목',
    ...(blockers.length ? blockers.map((item) => `- ${item.project}: ${item.blocker}`) : ['- 막힌 항목 없음']),
    '',
    '3. 외부기관 요청',
    ...(ownedRequests.length ? ownedRequests.map((request) => `- ${request.institution}: ${request.request} / ${request.status}`) : ['- 담당 외부 요청 없음']),
  ].join('\n');

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal member-modal" role="dialog" aria-modal="true" aria-labelledby="member-title">
        <div className="modal-header">
          <div>
            <h2 id="member-title">{member.name} 업무 상세</h2>
            <p>{member.role} · {member.focus}</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>

        <div className="member-detail-grid">
          <section className="member-detail-main">
            <div className="section-heading">
              <h3>담당/공동 담당 업무</h3>
              <button onClick={() => setToast(`${member.name} 업무 목록을 필터링했습니다.`)} type="button">목록 필터</button>
            </div>
            <div className="member-task-list">
              {ownedItems.map((item) => (
                <button key={item.id} onClick={() => chooseItem(item)} type="button">
                  <span className={`type-chip ${typeColors[item.type]}`}>{item.type}</span>
                  <strong>{item.task}</strong>
                  <p>{item.project}</p>
                  <small>{item.stage} · {item.status} · {item.due}</small>
                </button>
              ))}
            </div>
          </section>

          <aside className="member-detail-side">
            <section>
              <h3>책임 영역</h3>
              <div className="responsibility-list expanded">
                {member.responsibilities.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>
            <section>
              <h3>체크인 이력</h3>
              {ownedCheckins.length ? (
                ownedCheckins.slice(0, 4).map((checkin) => (
                  <button key={checkin.id} className="compact-status-row" onClick={() => advanceCheckinStatus(checkin.id)} type="button">
                    <span>{checkin.date} · {checkin.task}</span>
                    <strong>{checkin.status}</strong>
                  </button>
                ))
              ) : (
                <p>등록된 체크인 없음</p>
              )}
            </section>
            <section>
              <h3>외부 요청</h3>
              {ownedRequests.length ? (
                ownedRequests.map((request) => (
                  <p key={request.id}>{request.institution} · {request.status}</p>
                ))
              ) : (
                <p>담당 외부 요청 없음</p>
              )}
            </section>
            <section>
              <h3>연결 자료</h3>
              {ownedDocuments.length ? (
                ownedDocuments.map((doc) => (
                  <p key={doc.id}>{doc.name}</p>
                ))
              ) : (
                <p>담당 자료 없음</p>
              )}
            </section>
          </aside>

          <section className="member-weekly-draft">
            <div className="section-heading">
              <h3>주간 업무 입력 초안</h3>
              <button onClick={() => setToast(`${member.name} 주간 입력 초안을 저장했습니다.`)} type="button">초안 저장</button>
            </div>
            <textarea value={weeklyDraft} readOnly />
          </section>
        </div>
      </section>
    </div>
  );
}

function TeamInputPanel({
  items,
  teamCheckins,
  checkinDraft,
  updateCheckinDraft,
  submitTeamCheckin,
  advanceCheckinStatus,
  chooseItem,
  setFilters,
  setToast,
  onOpenMember,
}) {
  const [teamInsightModal, setTeamInsightModal] = useState('');
  const selectedMemberItems = items.filter((item) => item.owner === checkinDraft.member || item.coOwner === checkinDraft.member);
  const selectedItem = items.find((item) => item.id === checkinDraft.itemId) ?? selectedMemberItems[0] ?? items[0];
  const objectiveSignalRows = objectiveSignalOptions.map((option) => {
    const matchedCheckins = teamCheckins.filter((checkin) => {
      const linkedItem = items.find((item) => item.id === checkin.itemId);
      const signals = checkin.objectiveSignals ?? deriveObjectiveSignalsFromItem(linkedItem);
      return signals?.[option.key];
    });
    const affectedMembers = Array.from(new Set(matchedCheckins.map((checkin) => checkin.member)));
    const latest = matchedCheckins[0];
    const latestItem = latest ? items.find((item) => item.id === latest.itemId) : null;
    return {
      ...option,
      count: matchedCheckins.length,
      affectedMembers,
      latest,
      latestItem,
    };
  });
  const memberSignalRows = members.map((member) => {
    const latest = teamCheckins.find((checkin) => checkin.member === member.name);
    const linkedItem = latest ? items.find((item) => item.id === latest.itemId) : null;
    const signalLabels = latest ? getObjectiveSignalLabels(latest, linkedItem) : [];
    const actionSignalCount = signalLabels.filter((label) => label !== '증빙 제출').length;
    return {
      member,
      latest,
      linkedItem,
      signalLabels,
      actionSignalCount,
    };
  });
  const teamReportDraft = [
    '[팀 주간 업무보고 초안] 2026.06.08 ~ 2026.06.14',
    '',
    '1. 팀원별 입력 현황',
    ...members.map((member) => {
      const latest = teamCheckins.find((checkin) => checkin.member === member.name);
      const linkedItem = latest ? items.find((item) => item.id === latest.itemId) : null;
      return `- ${member.name}: ${latest ? `${latest.task} / ${latest.workStatus ?? linkedItem?.status ?? latest.status} / ${latest.status}` : '입력 대기'}`;
    }),
    '',
    '2. 보완 항목',
    ...(teamCheckins.filter((checkin) => checkin.blocker && checkin.blocker !== '-').length
      ? teamCheckins.filter((checkin) => checkin.blocker && checkin.blocker !== '-').slice(0, 6).map((checkin) => `- ${checkin.member}: ${checkin.blocker}`)
      : ['- 보완 항목 없음']),
    '',
    '3. 다음 액션',
    ...teamCheckins.slice(0, 6).map((checkin) => `- ${checkin.member}: ${checkin.nextAction}`),
    '',
    '4. 객관 체크 신호',
    ...teamCheckins.slice(0, 6).map((checkin) => {
      const linkedItem = items.find((item) => item.id === checkin.itemId);
      const signalLabels = getObjectiveSignalLabels(checkin, linkedItem);
      return `- ${checkin.member}: ${signalLabels.length ? signalLabels.join(', ') : '추가 확인 없음'}`;
    }),
    '',
    '5. 신호별 집계',
    ...objectiveSignalRows.map((row) => `- ${row.label}: ${row.count}건 / ${row.affectedMembers.length ? row.affectedMembers.join(', ') : '해당 없음'}`),
  ].join('\n');

  return (
    <div className="team-input-layout">
      <TeamRosterPanel
        items={items}
        checkins={teamCheckins}
        onOpenMember={onOpenMember}
        onOpenSummary={() => setTeamInsightModal('summary')}
      />

      <section className="objective-signal-board">
        <div className="section-heading">
          <div>
            <h3>객관 신호 현황</h3>
            <p>주관적 수치 대신 제출·회신·검토·마감 변경 신호로 팀 상태를 봅니다.</p>
          </div>
          <button onClick={() => setTeamInsightModal('signals')} type="button">신호 요약</button>
        </div>
        <div className="objective-signal-summary">
          {objectiveSignalRows.map((row) => (
            <button
              key={row.key}
              onClick={() => {
                if (row.latestItem) {
                  chooseItem(row.latestItem);
                  setFilters((state) => ({ ...state, owner: row.latest.member }));
                  setToast(`${row.label} 관련 최신 업무를 열었습니다.`);
                } else {
                  setToast(`${row.label} 항목은 현재 체크인이 없습니다.`);
                }
              }}
              type="button"
            >
              <span>{row.label}</span>
              <strong>{row.count}건</strong>
              <p>{row.affectedMembers.length ? row.affectedMembers.join(', ') : '해당 없음'}</p>
            </button>
          ))}
        </div>
        <div className="objective-member-grid">
          {memberSignalRows.map((row) => (
            <article key={row.member.name}>
              <div className="objective-member-head">
                <span className={`mini-avatar ${row.member.color}`}>{row.member.short}</span>
                <div>
                  <strong>{row.member.name}</strong>
                  <p>{row.latest ? `${row.latest.task} · ${row.latest.status}` : '입력 대기'}</p>
                </div>
                <b>{row.actionSignalCount}건</b>
              </div>
              <div className="objective-member-tags">
                {row.signalLabels.length ? row.signalLabels.map((label) => <span key={`${row.member.name}-${label}`}>{label}</span>) : <span>추가 확인 없음</span>}
              </div>
              <div className="objective-member-actions">
                <button
                  onClick={() => {
                    setFilters((state) => ({ ...state, owner: row.member.name }));
                    onOpenMember(row.member.name);
                  }}
                  type="button"
                >
                  담당자 보기
                </button>
                <button
                  onClick={() => {
                    if (row.linkedItem) {
                      chooseItem(row.linkedItem);
                    }
                  }}
                  type="button"
                  disabled={!row.linkedItem}
                >
                  업무 보기
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {false && (
      <section className="team-checkin-grid">
        <form className="checkin-form" onSubmit={submitTeamCheckin}>
          <div className="section-heading">
            <h3>주간 현황 체크인 입력</h3>
            <button type="submit">체크인 저장</button>
          </div>
          <div className="form-grid">
            <label>
              입력자
              <select value={checkinDraft.member} onChange={(event) => updateCheckinDraft('member', event.target.value)}>
                {members.map((member) => (
                  <option key={member.name}>{member.name}</option>
                ))}
              </select>
            </label>
            <label>
              연결 업무
              <select value={selectedItem?.id ?? ''} onChange={(event) => updateCheckinDraft('itemId', event.target.value)}>
                {selectedMemberItems.map((item) => (
                  <option key={item.id} value={item.id}>{item.task}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            업무 현황 요약
            <textarea value={checkinDraft.summary} onChange={(event) => updateCheckinDraft('summary', event.target.value)} />
          </label>
          <div className="form-grid">
            <label>
              업무 상태
              <select value={checkinDraft.workStatus} onChange={(event) => updateCheckinDraft('workStatus', event.target.value)}>
                <option>계획</option>
                <option>작성</option>
                <option>진행 중</option>
                <option>외부 협의</option>
                <option>보완 필요</option>
                <option>마감 대기</option>
                <option>종결</option>
              </select>
            </label>
            <label>
              증빙/산출물
              <input value={checkinDraft.evidence} onChange={(event) => updateCheckinDraft('evidence', event.target.value)} />
            </label>
          </div>
          <section className="objective-check-panel">
            <strong>객관 체크 신호</strong>
            <div className="checkin-signal-grid">
              {objectiveSignalOptions.map((option) => (
                <label key={option.key} className="checkin-toggle">
                  <input
                    checked={Boolean(checkinDraft.objectiveSignals?.[option.key])}
                    onChange={(event) =>
                      updateCheckinDraft('objectiveSignals', {
                        ...checkinDraft.objectiveSignals,
                        [option.key]: event.target.checked,
                      })
                    }
                    type="checkbox"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </section>
          <div className="form-grid">
            <label>
              막힌 항목
              <input value={checkinDraft.blocker} onChange={(event) => updateCheckinDraft('blocker', event.target.value)} />
            </label>
            <label>
              다음 액션
              <input value={checkinDraft.nextAction} onChange={(event) => updateCheckinDraft('nextAction', event.target.value)} />
            </label>
          </div>
        </form>

        <section className="checkin-feed">
          <div className="section-heading">
            <h3>최근 체크인 기록</h3>
            <button onClick={() => setToast('체크인 기록을 최신순으로 정렬했습니다.')} type="button">최신순</button>
          </div>
          <div className="checkin-list">
            {teamCheckins.slice(0, 6).map((checkin) => {
              const linkedItem = items.find((item) => item.id === checkin.itemId);
              const workStatus = checkin.workStatus ?? linkedItem?.status ?? '현황 입력';
              const signalLabels = getObjectiveSignalLabels(checkin, linkedItem);
              return (
                <article key={checkin.id}>
                  <div>
                    <span>{checkin.date} · {checkin.member}</span>
                    <strong>{checkin.task}</strong>
                    <p>{checkin.summary}</p>
                    {signalLabels.length ? (
                      <div className="checkin-signal-list">
                        {signalLabels.map((label) => (
                          <span key={`${checkin.id}-${label}`}>{label}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="checkin-actions">
                    <b>{workStatus}</b>
                    <button onClick={() => advanceCheckinStatus(checkin.id)} type="button">{checkin.status}</button>
                    <button onClick={() => chooseItem(linkedItem ?? selectedItem)} type="button">업무 보기</button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </section>
      )}

      <section className="member-lanes">
        {members.map((member) => {
          const memberItems = items.filter((item) => item.owner === member.name || item.coOwner === member.name);
          const latest = teamCheckins.find((checkin) => checkin.member === member.name);
          const latestItem = latest ? memberItems.find((item) => item.id === latest.itemId) : null;
          const latestStatus = latest ? latest.workStatus ?? latestItem?.status ?? latest.status : '';
          return (
            <article key={member.name}>
              <div className="member-lane-head">
                <span className={`mini-avatar ${member.color}`}>{member.short}</span>
                <div>
                  <strong>{member.name}</strong>
                  <p>{latest ? `최근 입력 ${latestStatus} · ${latest.status}` : member.role}</p>
                </div>
                <button
                  onClick={() => {
                    setFilters((state) => ({ ...state, owner: member.name }));
                    onOpenMember(member.name);
                  }}
                  type="button"
                >
                  보기
                </button>
              </div>
              {memberItems.slice(0, 4).map((item) => (
                <button key={`${member.name}-${item.id}`} onClick={() => chooseItem(item)} type="button">
                  <span>{item.task}</span>
                  <small>{item.type} · {item.status}</small>
                </button>
              ))}
            </article>
          );
        })}
      </section>

      <section className="weekly-report-builder">
        <div className="section-heading">
          <h3>주간 업무보고 초안</h3>
          <button onClick={() => setToast('팀 주간 업무보고 초안을 생성했습니다.')} type="button">초안 생성</button>
        </div>
        <textarea value={teamReportDraft} readOnly />
      </section>

      {teamInsightModal && (
        <TeamInsightModal
          kind={teamInsightModal}
          memberSignalRows={memberSignalRows}
          objectiveSignalRows={objectiveSignalRows}
          onClose={() => setTeamInsightModal('')}
          teamReportDraft={teamReportDraft}
        />
      )}
    </div>
  );
}

function TeamInsightModal({ kind, teamReportDraft, objectiveSignalRows, memberSignalRows, onClose }) {
  const isSummary = kind === 'summary';

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal report-modal team-insight-modal" role="dialog" aria-modal="true" aria-labelledby="team-insight-title">
        <div className="modal-header">
          <div>
            <h2 id="team-insight-title">{isSummary ? '팀 요약 생성' : '신호 요약'}</h2>
            <p>{isSummary ? '구성원별 최신 입력과 다음 액션을 보고 초안 형태로 확인합니다.' : '객관 신호별 발생 건수와 구성원별 최신 상태를 확인합니다.'}</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>

        {isSummary ? (
          <div className="report-builder">
            <textarea value={teamReportDraft} readOnly />
          </div>
        ) : (
          <div className="team-insight-body">
            <section className="team-insight-grid">
              {objectiveSignalRows.map((row) => (
                <article key={row.key}>
                  <span>{row.label}</span>
                  <strong>{row.count}건</strong>
                  <p>{row.affectedMembers.length ? row.affectedMembers.join(', ') : '해당 없음'}</p>
                </article>
              ))}
            </section>
            <section className="modal-table-shell">
              <table className="data-table modal-edit-table">
                <thead>
                  <tr>
                    <th>구성원</th>
                    <th>최근 업무</th>
                    <th>상태</th>
                    <th>객관 신호</th>
                  </tr>
                </thead>
                <tbody>
                  {memberSignalRows.map((row) => (
                    <tr key={row.member.name}>
                      <td>{row.member.name}</td>
                      <td>{row.latest?.task ?? '입력 대기'}</td>
                      <td>{row.latest?.status ?? '-'}</td>
                      <td>{row.signalLabels.length ? row.signalLabels.join(', ') : '추가 확인 없음'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}
      </section>
    </div>
  );
}

function ReportModal({ kind, setKind, draft, onClose, setToast }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title">
        <div className="modal-header">
          <div>
            <h2 id="report-title">리포트 초안 생성</h2>
            <p>현재 업무 레지스터와 선택 과제를 기준으로 바로 편집 가능한 초안을 만듭니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>

        <div className="report-builder">
          <div className="report-toolbar">
            {Object.entries(reportTemplates).map(([id, label]) => (
              <button key={id} className={kind === id ? 'active' : ''} onClick={() => setKind(id)} type="button">
                {label}
              </button>
            ))}
          </div>
          <textarea value={draft} readOnly />
          <div className="report-meta-grid">
            <article>
              <span>생성 기준</span>
              <strong>업무 레지스터 + 선택 업무</strong>
            </article>
            <article>
              <span>출력 후보</span>
              <strong>DOCX / PPTX / PDF</strong>
            </article>
            <article>
              <span>마감 상태</span>
              <strong>업무 진행 중</strong>
            </article>
          </div>
        </div>

        <div className="button-row modal-actions">
          <button className="secondary-action stretch" onClick={() => setToast('초안을 클립보드용 텍스트로 준비했습니다.')} type="button">
            <ClipboardCheck size={16} />
            초안 복사
          </button>
          <button className="secondary-action stretch" onClick={() => setToast('DOCX 내보내기 작업을 준비했습니다.')} type="button">
            <Download size={16} />
            DOCX
          </button>
          <button className="primary-action stretch" onClick={() => setToast('마감 전 공유본으로 저장했습니다.')} type="button">
            <Check size={16} />
            공유본 저장
          </button>
        </div>
      </section>
    </div>
  );
}

function ProjectDossierModal({ item, relatedItems, executionPlans, onClose, chooseItem, setToast }) {
  const gates = getProjectGates(item.project, relatedItems);
  const gateReadiness = gates.length ? Math.round(gates.reduce((sum, gate) => sum + gate.readiness, 0) / gates.length) : 0;
  const executionPlan = executionPlans.find((plan) => plan.projectName === item.project);
  const timelineRows = (executionPlan?.monthly ?? []).map(normalizeScheduleItem);

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal dossier-modal" role="dialog" aria-modal="true" aria-labelledby="dossier-title">
        <div className="modal-header">
          <div>
            <h2 id="dossier-title">과제 상세 대장</h2>
            <p>{item.project} 안에서 일정, KPI, 외부기관, 산출물, 증빙을 연결합니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>

        <div className="dossier-grid">
          <section className="dossier-summary">
            <article>
              <span>대표 업무</span>
              <strong>{item.task}</strong>
              <p>{item.memo}</p>
            </article>
            <article>
              <span>담당 / 외부기관</span>
              <strong>{item.owner} · {item.institution}</strong>
              <p>{item.coOwner} 공동 담당, {item.status}</p>
            </article>
            <article>
              <span>마감 / 확인 상태</span>
              <strong>{item.due} · {getRiskDisplay(item.risk)}</strong>
              <p>{item.blocker}</p>
            </article>
          </section>

          <section className="dossier-section">
            <div className="section-heading">
              <h3>월별 추진 일정</h3>
              <button onClick={() => setToast('과제 수행 탭의 월별 타임라인을 기준으로 표시했습니다.')} type="button">동기화</button>
            </div>
            {timelineRows.length ? (
              <div className="timeline-bar-board dossier-monthly-timeline">
                <div className="timeline-head timeline-bar-head">
                  <span>수행 항목</span>
                  {executionMonths.map((month) => <span key={month}>{month}월</span>)}
                </div>
                {timelineRows.map((row) => {
                  const startIndex = Math.max(0, executionMonths.indexOf(row.startMonth));
                  const rawEndIndex = executionMonths.indexOf(row.endMonth);
                  const endIndex = Math.max(startIndex, rawEndIndex === -1 ? executionMonths.length - 1 : rawEndIndex);
                  const statusClass = String(row.status ?? '').replaceAll(' ', '-');
                  return (
                    <div className="timeline-bar-row" key={row.id ?? `${row.category}-${row.title}`}>
                      <strong>
                        <span className="timeline-category-text">{row.category}</span>
                        <small>{row.owner} · {row.status}</small>
                      </strong>
                      <div className="timeline-bar-track">
                        {executionMonths.map((month) => <span key={`${row.id}-${month}`} />)}
                        <button
                          className={`timeline-bar ${statusClass}`}
                          onClick={() => setToast(`${row.title || row.category} 일정을 확인했습니다.`)}
                          style={{
                            gridColumn: `${startIndex + 1} / ${endIndex + 2}`,
                            '--timeline-color': row.color,
                          }}
                          type="button"
                        >
                          <span>{row.title || row.category}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="empty-panel-copy">과제 수행 탭에 등록된 월별 일정이 없습니다.</p>
            )}
          </section>

          <section className="dossier-section">
            <div className="section-heading">
              <h3>산출물 준비 현황</h3>
              <button onClick={() => setToast(`${item.project} 산출물 준비 현황을 점검했습니다.`)} type="button">산출물 점검</button>
            </div>
            <div className="gate-overview">
              <article>
                <span>평균 준비도</span>
                <strong>{gateReadiness}%</strong>
                <div className="progress-track wide">
                  <span style={{ width: `${gateReadiness}%` }} />
                </div>
              </article>
              <article>
                <span>관리 단계 수</span>
                <strong>{gates.length}개</strong>
                <p>제출·평가·검토 단계 기준</p>
              </article>
              <article>
                <span>보완 필요</span>
                <strong>{gates.reduce((sum, gate) => sum + gate.missing.filter((missing) => missing !== '추가 보완 없음').length, 0)}개</strong>
                <p>누락 산출물과 외부 회신 포함</p>
              </article>
            </div>
            <div className="gate-table">
              <div className="gate-table-head">
                <span>관리 단계</span>
                <span>담당</span>
                <span>마감</span>
                <span>준비도</span>
                <span>필수 산출물</span>
                <span>보완 필요</span>
              </div>
              {gates.map((gate) => (
                <button key={gate.gate} onClick={() => setToast(`${gate.gate} 산출물 목록을 확인했습니다.`)} type="button">
                  <strong>{gate.gate}</strong>
                  <span>{gate.owner}</span>
                  <span>{gate.due}</span>
                  <span>{gate.readiness}%</span>
                  <span>{gate.required.join(', ')}</span>
                  <span>{gate.missing.join(', ')}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="dossier-section">
            <div className="section-heading">
              <h3>연결 업무</h3>
              <button onClick={() => setToast('연결 업무를 다시 수집했습니다.')} type="button">새로고침</button>
            </div>
            <div className="dossier-related">
              {relatedItems.map((related) => (
                <button
                  key={related.id}
                  onClick={() => {
                    chooseItem(related);
                    setToast(`${related.task} 업무를 선택했습니다.`);
                  }}
                  type="button"
                >
                  <span className={`type-chip ${typeColors[related.type]}`}>{related.type}</span>
                  <strong>{related.task}</strong>
                  <small>{related.owner} · {related.status} · {related.due}</small>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="button-row modal-actions">
          <button
            className="secondary-action stretch"
            onClick={() => {
              setToast('브라우저 인쇄 창에서 PDF 저장을 선택하세요.');
              window.setTimeout(() => window.print(), 120);
            }}
            type="button"
          >
            <Download size={16} />
            대장 내보내기
          </button>
          <button className="primary-action stretch" onClick={() => setToast('과제 회의자료 초안을 생성했습니다.')} type="button">
            <FileText size={16} />
            회의자료 생성
          </button>
        </div>
      </section>
    </div>
  );
}

function ExternalRequestTracker({ requests, onAdvance, chooseProject, setToast }) {
  return (
    <div className="panel external-panel">
      <div className="panel-header">
        <div>
          <h2>외부기관 요청/회신 트래커</h2>
          <p>전문기관, 시험기관, 특허법인, 공급업체 요청자료와 회신 상태를 관리합니다.</p>
        </div>
        <button className="secondary-action" onClick={() => setToast('외부기관 요청 메일 초안을 생성했습니다.')} type="button">
          <MessageSquareText size={16} />
          요청 메일 초안
        </button>
      </div>
      <div className="external-list">
        {requests.map((request) => (
          <article key={request.id}>
            <div className="external-main">
              <span className={`request-status ${request.status.replaceAll(' ', '-')}`}>{request.status}</span>
              <strong>{request.request}</strong>
              <p>{request.project} · {request.institution} · {request.channel}</p>
              <small>{request.lastMemo}</small>
            </div>
            <div className="external-meta">
              <span>{request.owner}</span>
              <b>D-{Math.max(0, daysLeft(request.due))}</b>
              <button onClick={() => onAdvance(request.id)} type="button">상태 변경</button>
              <button onClick={() => chooseProject(request.project)} type="button">과제 보기</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function EvidenceVaultPanel({ documents, chooseProject, setToast }) {
  return (
    <div className="panel vault-panel">
      <div className="panel-header">
        <div>
          <h2>증빙·자료 보관함</h2>
          <p>계획서, 시험자료, 특허, 지원사업, IR 자료를 업무와 연결합니다.</p>
        </div>
        <button className="secondary-action" onClick={() => setToast('자료 자동 분류를 실행했습니다.')} type="button">
          <Archive size={16} />
          자동 분류
        </button>
      </div>
      <div className="vault-table">
        <div className="vault-head">
          <span>자료명</span>
          <span>유형</span>
          <span>연결 과제</span>
          <span>담당</span>
          <span>상태</span>
          <span>연결</span>
        </div>
        {documents.map((doc) => (
          <button key={doc.id} className="vault-row" onClick={() => chooseProject(doc.project)} type="button">
            <span>
              <FileText size={14} />
              {doc.name}
            </span>
            <span>{doc.type}</span>
            <span>{doc.project}</span>
            <span>{doc.owner}</span>
            <span className="stage-chip">{doc.status}</span>
            <strong>{doc.linked}개 업무</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

function EvidenceTraceabilityPanel({ items, documents, requests, selectedProjectName, onSelectProject, onOpenItem, setToast }) {
  const scopedItems = selectedProjectName === '전체 프로젝트' ? items : items.filter((item) => item.project === selectedProjectName);
  const projects = Array.from(new Set(scopedItems.map((item) => item.project))).map((project) => {
    const projectItems = scopedItems.filter((item) => item.project === project);
    const projectDocs = documents.filter((doc) => doc.project === project);
    const projectRequests = requests.filter((request) => request.project === project);
    const missingItems = projectItems.filter((item) => hasBlocker(item) || !item.evidence?.length);
    const closeItems = projectItems.filter((item) => item.status === '마감 대기' || item.status === '종결');
    const nextItem = missingItems[0] ?? projectItems.slice().sort((a, b) => a.due.localeCompare(b.due))[0];
    return {
      project,
      projectItems,
      projectDocs,
      projectRequests,
      missingItems,
      closeItems,
      nextItem,
      owners: Array.from(new Set(projectItems.flatMap((item) => [item.owner, item.coOwner]).filter((owner) => owner && owner !== '공동 담당자'))).slice(0, 3),
    };
  });
  const totalDocs = projects.reduce((sum, row) => sum + row.projectDocs.length, 0);
  const totalRequests = projects.reduce((sum, row) => sum + row.projectRequests.length, 0);
  const totalMissing = projects.reduce((sum, row) => sum + row.missingItems.length, 0);

  return (
    <section className="panel evidence-trace-panel">
      <div className="panel-header">
        <div>
          <h2>증빙 추적성</h2>
          <p>업무별 필요 증빙, 외부기관 요청, 마감 상태를 과제 단위로 연결해 봅니다.</p>
        </div>
        <button onClick={() => setToast('증빙 누락 점검표를 생성했습니다.')} type="button">누락 점검</button>
      </div>

      <div className="evidence-trace-summary">
        <article>
          <span>연결 과제</span>
          <strong>{projects.length}개</strong>
        </article>
        <article>
          <span>보관 자료</span>
          <strong>{totalDocs}건</strong>
        </article>
        <article>
          <span>외부 요청</span>
          <strong>{totalRequests}건</strong>
        </article>
        <article>
          <span>보완 필요</span>
          <strong>{totalMissing}건</strong>
        </article>
      </div>

      <div className="evidence-trace-grid">
        {projects.slice(0, 8).map((row) => (
          <article key={row.project}>
            <div className="evidence-trace-head">
              <strong>{row.project}</strong>
              <span className={row.missingItems.length ? 'risk-dot risk-mid' : 'risk-dot risk-low'}>{row.missingItems.length ? '보완' : '정상'}</span>
            </div>

            <div className="evidence-trace-stats">
              <span>업무 {row.projectItems.length}</span>
              <span>자료 {row.projectDocs.length}</span>
              <span>외부 {row.projectRequests.length}</span>
              <span>마감 {row.closeItems.length}</span>
            </div>

            <div className="evidence-trace-tags">
              {row.owners.map((owner) => (
                <span key={`${row.project}-${owner}`}>{owner}</span>
              ))}
            </div>

            <p>{row.nextItem ? `${row.nextItem.evidenceNeed} · ${row.nextItem.task}` : '추적할 업무 없음'}</p>

            <div className="evidence-trace-actions">
              <button onClick={() => onSelectProject(row.project)} type="button">과제 필터</button>
              <button onClick={() => (row.nextItem ? onOpenItem(row.nextItem) : setToast(`${row.project} 증빙 연결 업무가 없습니다.`))} type="button">보완 업무</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectCommandPanel({ summaries, selectedProjectName, onSelectProject, onOpenDossier }) {
  return (
    <section className="panel project-command-panel">
      <div className="panel-header">
        <div>
          <h2>과제별 운영판</h2>
          <p>여러 연구개발과제 안에 흩어진 업무, 담당자, 마감, 외부 요청을 과제 단위로 묶어 봅니다.</p>
        </div>
      </div>

      <div className="project-summary-grid">
        {summaries.map((summary) => (
          <article key={summary.name} className={selectedProjectName === summary.name ? 'active' : ''}>
            <div className="project-summary-top">
              <div>
                <span>{summary.primaryType}</span>
                <strong>{summary.name}</strong>
              </div>
              <b className={`risk-dot ${summary.highRisk ? 'risk-high' : summary.dueSoon ? 'risk-mid' : 'risk-low'}`}>
                {summary.highRisk ? '확인 필요' : summary.dueSoon ? '마감 임박' : '정상'}
              </b>
            </div>

            <div className="project-summary-progress">
              <div>
                <span>산출물 준비도</span>
                <strong>{summary.gateReadiness}%</strong>
              </div>
              <div className="progress-track wide">
                <span style={{ width: `${summary.gateReadiness}%` }} />
              </div>
            </div>

            <div className="project-summary-stats">
              <span>업무 {summary.taskCount}</span>
              <span>마감 {summary.dueSoon}</span>
              <span>확인 {summary.highRisk}</span>
              <span>체크인 {summary.checkinCount}</span>
              <span>외부요청 {summary.requestCount}</span>
              <span>보완 {summary.missingCount}</span>
            </div>

            <div className="project-summary-members">
              {summary.members.map((member) => (
                <span key={member}>{member}</span>
              ))}
            </div>

            <p>{summary.nextTask ? `${summary.nextTask.task} · ${summary.nextTask.due}` : '등록된 다음 업무 없음'}</p>

            <div className="project-summary-actions">
              <button onClick={() => onSelectProject(summary.name)} type="button">레지스터 필터</button>
              <button onClick={() => onOpenDossier(summary.name)} type="button">과제 대장</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DomainOperationsPanel({ items, selectedType, selectedProjectName, onSelectDomain, onOpenItem, onOpenDomainLedger, setToast }) {
  const scopedItems = selectedProjectName === '전체 프로젝트' ? items : items.filter((item) => item.project === selectedProjectName);
  const activeDomains = domainOperations.filter((domain) => scopedItems.some((item) => item.type === domain.type)).length;
  const blockedCount = scopedItems.filter(hasBlocker).length;
  const closeReadyCount = scopedItems.filter((item) => item.status === '마감 대기' || item.status === '종결').length;
  const dueSoonCount = scopedItems.filter((item) => daysLeft(item.due) <= 7).length;

  return (
    <section className="panel domain-operation-panel">
      <div className="panel-header">
        <div>
          <h2>업무영역 운영판</h2>
          <p>과제 안에서 반복되는 기획, 지원사업, 특허, 시험, 증빙 업무를 영역별로 봅니다.</p>
        </div>
      </div>

      <div className="domain-overview-strip">
        <article>
          <span>활성 영역</span>
          <strong>{activeDomains}개</strong>
        </article>
        <article>
          <span>마감 임박</span>
          <strong>{dueSoonCount}건</strong>
        </article>
        <article>
          <span>마감/종결</span>
          <strong>{closeReadyCount}건</strong>
        </article>
        <article>
          <span>보완 항목</span>
          <strong>{blockedCount}건</strong>
        </article>
      </div>

      <div className="domain-operation-grid">
        {domainOperations.map((domain) => {
          const domainItems = scopedItems.filter((item) => item.type === domain.type);
          const nextItem = domainItems.slice().sort((a, b) => a.due.localeCompare(b.due))[0];
          const owners = Array.from(new Set(domainItems.flatMap((item) => [item.owner, item.coOwner]).filter((owner) => owner && owner !== '공동 담당자'))).slice(0, 3);
          const blocked = domainItems.filter(hasBlocker).length;
          const dueSoon = domainItems.filter((item) => daysLeft(item.due) <= 7).length;
          const evidenceNeeds = domainItems.filter((item) => item.evidenceNeed && (hasBlocker(item) || !item.evidence?.length)).length;

          return (
            <article className={selectedType === domain.type ? 'active' : ''} key={domain.type}>
              <div className="domain-card-head">
                <span className={`type-chip ${typeColors[domain.type]}`}>{domain.type}</span>
                <strong>{domain.label}</strong>
              </div>
              <p>{domain.rhythm}</p>

          <div className="domain-card-stats">
            <span>업무 {domainItems.length}</span>
            <span>마감 {dueSoon}</span>
            <span>보완 {blocked}</span>
            <span>증빙 {evidenceNeeds}</span>
          </div>

              <div className="domain-card-tags">
                {owners.length ? owners.map((owner) => <span key={`${domain.type}-${owner}`}>{owner}</span>) : <span>담당자 배정 필요</span>}
              </div>

              <div className="domain-card-required">
                {domain.required.map((item) => (
                  <span key={`${domain.type}-${item}`}>{item}</span>
                ))}
              </div>

              <p className="domain-next-task">
                {nextItem ? `${nextItem.task} · ${nextItem.owner} · ${nextItem.due.slice(5)}` : '등록된 업무 없음'}
              </p>

              <div className="domain-card-actions">
                <button onClick={() => onSelectDomain(domain.type)} type="button">레지스터</button>
                <button onClick={() => onOpenDomainLedger(domain.type)} type="button">업무 대장</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function DomainLedgerModal({ type, items, selectedProjectName, onClose, onSelectDomain, onOpenItem }) {
  const domain = domainOperations.find((item) => item.type === type) ?? domainOperations[0];
  const scopedItems = items
    .filter((item) => item.type === domain.type)
    .filter((item) => selectedProjectName === '전체 프로젝트' || item.project === selectedProjectName)
    .slice()
    .sort((a, b) => a.due.localeCompare(b.due) || a.owner.localeCompare(b.owner));
  const ownerRows = members
    .map((member) => {
      const ownedItems = scopedItems.filter((item) => item.owner === member.name || item.coOwner === member.name);
      return {
        member,
        count: ownedItems.length,
        dueSoon: ownedItems.filter((item) => daysLeft(item.due) <= 7).length,
      };
    })
    .filter((row) => row.count);
  const categoryRows = Array.from(new Set(scopedItems.map((item) => item.workCategory || getDefaultWorkCategory('', item.type))))
    .map((category) => ({
      category,
      count: scopedItems.filter((item) => (item.workCategory || getDefaultWorkCategory('', item.type)) === category).length,
    }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
  const statusRows = statusOptions
    .map((status) => ({ status, count: scopedItems.filter((item) => item.status === status).length }))
    .filter((row) => row.count);
  const evidenceNeeded = scopedItems.filter((item) => item.evidenceNeed && (hasBlocker(item) || !item.evidence?.length)).length;

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal dossier-modal domain-ledger-modal" role="dialog" aria-modal="true" aria-labelledby="domain-ledger-title">
        <div className="modal-header">
          <div>
            <h2 id="domain-ledger-title">{domain.label} 업무 대장</h2>
            <p>{selectedProjectName === '전체 프로젝트' ? '전체 과제' : selectedProjectName} 기준으로 담당자, 범주, 마감을 정리합니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>

        <div className="dossier-grid">
          <section className="dossier-summary">
            <article>
              <span>총 업무</span>
              <strong>{scopedItems.length}건</strong>
              <p>{domain.rhythm}</p>
            </article>
            <article>
              <span>담당자</span>
              <strong>{ownerRows.length}명</strong>
              <p>{ownerRows.map((row) => `${row.member.name} ${row.count}건`).join(' · ') || '배정된 담당자 없음'}</p>
            </article>
            <article>
              <span>보완 항목</span>
              <strong>{evidenceNeeded}건</strong>
              <p>필요 증빙, 보완 메모, 파일 연결 기준</p>
            </article>
          </section>

          <section className="domain-ledger-grid">
            <article className="dossier-section">
              <div className="section-heading">
                <h3>업무 범주</h3>
              </div>
              <div className="ledger-chip-list">
                {categoryRows.length ? categoryRows.map((row) => <span key={row.category}>{row.category} {row.count}건</span>) : <p>분류된 업무 없음</p>}
              </div>
            </article>
            <article className="dossier-section">
              <div className="section-heading">
                <h3>상태별 현황</h3>
              </div>
              <div className="ledger-chip-list">
                {statusRows.length ? statusRows.map((row) => <span key={row.status}>{row.status} {row.count}건</span>) : <p>등록 업무 없음</p>}
              </div>
            </article>
          </section>

          <section className="dossier-section">
            <div className="section-heading">
              <h3>마감순 업무 목록</h3>
              <button onClick={() => onSelectDomain(domain.type)} type="button">레지스터 필터</button>
            </div>
            <div className="domain-ledger-table">
              <div className="domain-ledger-head">
                <span>과제/사업명</span>
                <span>업무 범주</span>
                <span>업무명</span>
                <span>담당자</span>
                <span>상태</span>
                <span>마감</span>
                <span>확인 상태</span>
              </div>
              {scopedItems.map((row) => (
                <button key={row.id} onClick={() => onOpenItem(row)} type="button">
                  <span>{row.project}</span>
                  <span>{row.workCategory || getDefaultWorkCategory('', row.type)}</span>
                  <strong>{row.task}</strong>
                  <span>{row.owner}</span>
                  <span>{row.status}</span>
                  <span>{row.due}</span>
                  <span>{getRiskDisplay(row.risk)}</span>
                </button>
              ))}
              {!scopedItems.length && <p className="empty-panel-copy">해당 업무영역에 등록된 업무가 없습니다.</p>}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function RoleCoveragePanel({ items, selectedProjectName, onSelectCoverage, onOpenItem, setToast }) {
  const scopedItems = selectedProjectName === '전체 프로젝트' ? items : items.filter((item) => item.project === selectedProjectName);
  const coverageRows = roleCoverageGroups.map((coverage) => {
    const coverageItems = scopedItems.filter((item) => matchesRoleCoverage(item, coverage));
    const sortedItems = coverageItems.slice().sort((a, b) => a.due.localeCompare(b.due));
    const owners = Array.from(new Set(coverageItems.flatMap((item) => [item.owner, item.coOwner]).filter((owner) => owner && owner !== '공동 담당자'))).slice(0, 4);
    return {
      ...coverage,
      items: coverageItems,
      nextItem: sortedItems[0],
      owners,
      dueSoon: coverageItems.filter((item) => daysLeft(item.due) <= 7).length,
      blockers: coverageItems.filter(hasBlocker).length,
      evidenceCount: coverageItems.reduce((sum, item) => sum + (item.evidence?.length ?? 0), 0),
    };
  });
  const activeCoverage = coverageRows.filter((row) => row.items.length).length;
  const totalDuties = roleCoverageGroups.reduce((sum, row) => sum + row.duties.length, 0);
  const blockedAreas = coverageRows.filter((row) => row.blockers).length;

  return (
    <section className="panel role-coverage-panel">
      <div className="panel-header">
        <div>
          <h2>직무기술서 커버리지</h2>
          <p>김태현 R&D 지원 직무의 주요 책임이 현재 업무에 어떻게 반영되는지 확인합니다.</p>
        </div>
        <button onClick={() => setToast('직무기술서 기준 누락 점검표를 생성했습니다.')} type="button">누락 점검</button>
      </div>

      <div className="role-coverage-summary">
        <article>
          <span>책임 영역</span>
          <strong>{activeCoverage}/6</strong>
        </article>
        <article>
          <span>세부 활동</span>
          <strong>{totalDuties}개</strong>
        </article>
        <article>
          <span>보유 증빙</span>
          <strong>{coverageRows.reduce((sum, row) => sum + row.evidenceCount, 0)}건</strong>
        </article>
        <article>
          <span>막힘 영역</span>
          <strong>{blockedAreas}개</strong>
        </article>
      </div>

      <div className="role-coverage-grid">
        {coverageRows.map((row) => (
          <article key={row.id}>
            <div className="role-coverage-head">
              <span>{row.title}</span>
              <strong>{row.items.length}건</strong>
            </div>

            <div className="role-duty-list">
              {row.duties.map((duty) => (
                <span key={`${row.id}-${duty}`}>{duty}</span>
              ))}
            </div>

            <div className="role-coverage-stats">
              <span>마감 {row.dueSoon}</span>
              <span>막힘 {row.blockers}</span>
              <span>증빙 {row.evidenceCount}</span>
            </div>

            <div className="role-owner-list">
              {row.owners.length ? row.owners.map((owner) => <span key={`${row.id}-${owner}`}>{owner}</span>) : <span>담당자 확인 필요</span>}
            </div>

            <p>{row.nextItem ? `${row.nextItem.task} · ${row.nextItem.due.slice(5)}` : '연결된 업무 없음'}</p>

            <div className="role-coverage-actions">
              <button onClick={() => onSelectCoverage(row)} type="button">레지스터</button>
              <button onClick={() => (row.nextItem ? onOpenItem(row.nextItem) : setToast(`${row.title} 연결 업무를 새로 등록해야 합니다.`))} type="button">다음 업무</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TeamResponsibilityPanel({ items, checkins, comments, selectedProjectName, onSelectMember, onOpenMember, onOpenAllocationPlan }) {
  const scopedItems = selectedProjectName === '전체 프로젝트' ? items : items.filter((item) => item.project === selectedProjectName);
  const rows = members.map((member) => {
    const ownedItems = scopedItems.filter((item) => item.owner === member.name || item.coOwner === member.name);
    const primaryItems = scopedItems.filter((item) => item.owner === member.name);
    const coOwnedItems = scopedItems.filter((item) => item.coOwner === member.name);
    const memberCheckins = checkins.filter((checkin) => checkin.member === member.name);
    const coverageAreas = roleCoverageGroups.filter((coverage) => ownedItems.some((item) => matchesRoleCoverage(item, coverage)));
    const nextItem = ownedItems.slice().sort((a, b) => a.due.localeCompare(b.due))[0];
    return {
      member,
      ownedItems,
      primaryItems,
      coOwnedItems,
      memberCheckins,
      coverageAreas,
      nextItem,
      dueSoon: ownedItems.filter((item) => daysLeft(item.due) <= 7).length,
      blockers: ownedItems.filter(hasBlocker).length,
      commentCount: comments.filter((comment) => ownedItems.some((item) => item.id === comment.itemId)).length,
    };
  });
  const totalOwned = rows.reduce((sum, row) => sum + row.ownedItems.length, 0);
  const totalBlockers = rows.reduce((sum, row) => sum + row.blockers, 0);
  const totalDueSoon = rows.reduce((sum, row) => sum + row.dueSoon, 0);
  const coveredAreas = new Set(rows.flatMap((row) => row.coverageAreas.map((area) => area.id))).size;

  return (
    <section className="panel team-responsibility-panel">
      <div className="panel-header">
        <div>
          <h2>구성원 수행 업무</h2>
          <p>구성원별 담당 업무, 공동 업무, 마감 일정, 보완 항목을 한 화면에서 확인합니다.</p>
        </div>
        <button onClick={onOpenAllocationPlan} type="button">업무 배분안</button>
      </div>

      <div className="team-responsibility-summary">
        <article>
          <span>담당/공동 업무</span>
          <strong>{totalOwned}건</strong>
        </article>
        <article>
          <span>마감 임박</span>
          <strong>{totalDueSoon}건</strong>
        </article>
        <article>
          <span>보완 항목</span>
          <strong>{totalBlockers}건</strong>
        </article>
        <article>
          <span>책임 범주</span>
          <strong>{coveredAreas}/6</strong>
        </article>
      </div>

      <div className="team-responsibility-grid">
        {rows.map((row) => (
          <article key={row.member.name}>
            <div className="team-responsibility-head">
              <span className={`mini-avatar ${row.member.color}`}>{row.member.short}</span>
              <div>
                <strong>{row.member.name}</strong>
                <p>{row.member.role}</p>
              </div>
            </div>

            <p className="team-responsibility-focus">{row.member.focus}</p>

            <div className="team-responsibility-stats">
              <span>주담당 {row.primaryItems.length}</span>
              <span>공동 {row.coOwnedItems.length}</span>
              <span>마감 {row.dueSoon}</span>
              <span>보완 {row.blockers}</span>
              <span>의견 {row.commentCount}</span>
              <span>입력 {row.memberCheckins.length}</span>
            </div>

            <div className="team-responsibility-tags">
              {row.coverageAreas.slice(0, 4).map((area) => (
                <span key={`${row.member.name}-${area.id}`}>{area.title.replace(/^\d+\.\s*/, '')}</span>
              ))}
              {!row.coverageAreas.length && <span>연결 책임영역 없음</span>}
            </div>

            <p className="team-responsibility-next">
              {row.nextItem ? `${row.nextItem.task} · ${row.nextItem.due.slice(5)}` : '배정된 업무 없음'}
            </p>

            <div className="team-responsibility-actions">
              <button onClick={() => onSelectMember(row.member.name)} type="button">담당 필터</button>
              <button onClick={() => onOpenMember(row.member.name)} type="button">상세</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WorkAllocationModal({ items, selectedProjectName, onClose, onOpenItem, onSelectMember }) {
  const scopedItems = selectedProjectName === '전체 프로젝트' ? items : items.filter((item) => item.project === selectedProjectName);
  const activeItems = scopedItems.filter((item) => item.status !== '종결');
  const memberRows = members.map((member) => {
    const ownedItems = activeItems.filter((item) => item.owner === member.name || item.coOwner === member.name);
    const categoryCounts = ownedItems.reduce((counts, item) => {
      const category = item.workCategory || getDefaultWorkCategory('', item.type);
      return { ...counts, [category]: (counts[category] ?? 0) + 1 };
    }, {});
    const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
    return {
      member,
      ownedItems,
      primaryCount: ownedItems.filter((item) => item.owner === member.name).length,
      dueSoon: ownedItems.filter((item) => daysLeft(item.due) <= 7).length,
      categoryCounts,
      topCategory,
    };
  });
  const averageLoad = memberRows.length ? activeItems.length / memberRows.length : 0;
  const overloadedRows = memberRows.filter((row) => row.ownedItems.length > averageLoad + 1).sort((a, b) => b.ownedItems.length - a.ownedItems.length);
  const lighterRows = memberRows.filter((row) => row.ownedItems.length < averageLoad).sort((a, b) => a.ownedItems.length - b.ownedItems.length);
  const recommendations = overloadedRows.flatMap((sourceRow) => {
    const transferCandidates = sourceRow.ownedItems
      .filter((item) => item.status !== '마감 대기')
      .slice()
      .sort((a, b) => daysLeft(b.due) - daysLeft(a.due))
      .slice(0, 2);

    return transferCandidates.map((task) => {
      const category = task.workCategory || getDefaultWorkCategory('', task.type);
      const targetRow =
        lighterRows
          .filter((row) => row.member.name !== sourceRow.member.name)
          .sort((a, b) => (a.categoryCounts[category] ?? 0) - (b.categoryCounts[category] ?? 0) || a.ownedItems.length - b.ownedItems.length)[0] ??
        memberRows
          .filter((row) => row.member.name !== sourceRow.member.name)
          .sort((a, b) => a.ownedItems.length - b.ownedItems.length)[0];

      return {
        task,
        category,
        from: sourceRow.member.name,
        to: targetRow?.member.name ?? '담당자 협의 필요',
        reason: `${sourceRow.member.name} ${sourceRow.ownedItems.length}건, ${targetRow?.member.name ?? '후보 없음'} ${targetRow?.ownedItems.length ?? 0}건`,
      };
    });
  });

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal dossier-modal allocation-modal" role="dialog" aria-modal="true" aria-labelledby="allocation-title">
        <div className="modal-header">
          <div>
            <h2 id="allocation-title">업무 배분안</h2>
            <p>{selectedProjectName === '전체 프로젝트' ? '전체 과제' : selectedProjectName} 기준으로 업무 수와 범주 편중을 계산합니다.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="닫기">
            <X size={18} />
          </button>
        </div>

        <div className="dossier-grid">
          <section className="team-responsibility-summary">
            <article>
              <span>활성 업무</span>
              <strong>{activeItems.length}건</strong>
            </article>
            <article>
              <span>평균 담당량</span>
              <strong>{averageLoad.toFixed(1)}건</strong>
            </article>
            <article>
              <span>업무 집중 인원</span>
              <strong>{overloadedRows.length}명</strong>
            </article>
            <article>
              <span>이관 후보</span>
              <strong>{recommendations.length}건</strong>
            </article>
          </section>

          <section className="allocation-member-grid">
            {memberRows.map((row) => (
              <article key={row.member.name}>
                <div className="team-responsibility-head">
                  <span className={`mini-avatar ${row.member.color}`}>{row.member.short}</span>
                  <div>
                    <strong>{row.member.name}</strong>
                    <p>{row.member.role}</p>
                  </div>
                </div>
                <div className="team-responsibility-stats">
                  <span>담당 {row.ownedItems.length}</span>
                  <span>주담당 {row.primaryCount}</span>
                  <span>마감 {row.dueSoon}</span>
                </div>
                <p className="team-responsibility-next">
                  {row.topCategory ? `${row.topCategory[0]} ${row.topCategory[1]}건 집중` : '배정된 업무 없음'}
                </p>
                <button onClick={() => onSelectMember(row.member.name)} type="button">담당 업무 보기</button>
              </article>
            ))}
          </section>

          <section className="dossier-section">
            <div className="section-heading">
              <h3>이관 추천안</h3>
            </div>
            <div className="allocation-recommendation-list">
              {recommendations.length ? (
                recommendations.map((row) => (
                  <article key={`${row.task.id}-${row.to}`}>
                    <div>
                      <span className={`type-chip ${typeColors[row.task.type]}`}>{row.task.type}</span>
                      <strong>{row.task.task}</strong>
                      <p>{row.task.project} · {row.category} · 마감 {row.task.due}</p>
                    </div>
                    <div>
                      <b>{row.from} → {row.to}</b>
                      <small>{row.reason}</small>
                      <button onClick={() => onOpenItem(row.task)} type="button">업무 열기</button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="empty-panel-copy">현재 기준으로 즉시 이관할 후보가 없습니다.</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function WorkStatusBoard({ items, selectedStatus, selectedProjectName, onSelectStatus, onOpenItem, setToast }) {
  const scopedItems = selectedProjectName === '전체 프로젝트' ? items : items.filter((item) => item.project === selectedProjectName);
  const boardStatuses = statusOptions.filter((status) => scopedItems.some((item) => item.status === status));
  const visibleStatuses = boardStatuses.length ? boardStatuses : statusOptions.slice(0, 4);
  const totalBlocked = scopedItems.filter(hasBlocker).length;
  const closeWaiting = scopedItems.filter((item) => item.status === '마감 대기').length;

  return (
    <section className="panel status-board-panel">
      <div className="panel-header">
        <div>
          <h2>상태 기준 업무 보드</h2>
          <p>주관적 % 대신 상태, 막힌 항목, 다음 액션으로 업무 흐름을 봅니다.</p>
        </div>
        <div className="status-board-actions">
          <button className="select-like compact" onClick={() => onSelectStatus('전체 상태')} type="button">
            전체 상태
            <ChevronDown size={14} />
          </button>
          <button onClick={() => setToast('상태별 업무 현황 요약을 생성했습니다.')} type="button">상태 요약</button>
        </div>
      </div>

      <div className="status-summary-grid">
        <article>
          <span>표시 업무</span>
          <strong>{scopedItems.length}건</strong>
        </article>
        <article>
          <span>마감 대기</span>
          <strong>{closeWaiting}건</strong>
        </article>
        <article>
          <span>막힌 항목</span>
          <strong>{totalBlocked}건</strong>
        </article>
        <article>
          <span>선택 상태</span>
          <strong>{selectedStatus}</strong>
        </article>
      </div>

      <div className="status-lane-grid">
        {visibleStatuses.map((status) => {
          const laneItems = scopedItems.filter((item) => item.status === status);
          const blocked = laneItems.filter(hasBlocker).length;
          const dueSoon = laneItems.filter((item) => daysLeft(item.due) <= 7).length;
          return (
            <article className={`status-lane ${selectedStatus === status ? 'active' : ''}`} key={status}>
              <button className="status-lane-head" onClick={() => onSelectStatus(status)} type="button">
                <span>{status}</span>
                <strong>{laneItems.length}건</strong>
                <small>마감 {dueSoon} · 막힘 {blocked}</small>
              </button>
              <div className="status-item-list">
                {laneItems.slice(0, 3).map((item) => (
                  <button key={`${status}-${item.id}`} onClick={() => onOpenItem(item)} type="button">
                    <span className={`type-chip ${typeColors[item.type]}`}>{item.type}</span>
                    <strong>{item.task}</strong>
                    <small>{item.owner} · {item.due.slice(5)} · {item.nextAction}</small>
                  </button>
                ))}
                {!laneItems.length && <p>해당 상태 업무 없음</p>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function WeeklyOpsCalendar({ entries, selectedProjectName, onOpenEntry, onShowAll, setToast }) {
  const scopedEntries = selectedProjectName === '전체 프로젝트' ? entries : entries.filter((entry) => entry.project === selectedProjectName);
  const overloadedDays = weekDays.filter((day) => scopedEntries.filter((entry) => entry.date === day.date).length >= 3).length;

  return (
    <section className="panel weekly-calendar-panel">
      <div className="panel-header">
        <div>
          <h2>주간 운영 캘린더</h2>
          <p>업무 마감, 제출 일정, 외부기관 회신을 2026.06.08 주간 기준으로 정리합니다.</p>
        </div>
        <div className="calendar-actions">
          <button className="select-like compact" onClick={onShowAll} type="button">
            전체 일정
            <ChevronDown size={14} />
          </button>
          <button onClick={() => setToast(`이번 주 병목 가능일 ${overloadedDays}일을 표시했습니다.`)} type="button">
            병목 {overloadedDays}일
          </button>
        </div>
      </div>

      <div className="calendar-week-grid">
        {weekDays.map((day) => {
          const dayEntries = scopedEntries.filter((entry) => entry.date === day.date);
          return (
            <article key={day.date} className={dayEntries.length >= 3 ? 'dense' : ''}>
              <div className="calendar-day-head">
                <span>{day.label}</span>
                <strong>{day.short}</strong>
                <b>{dayEntries.length}건</b>
              </div>
              <div className="calendar-entry-list">
                {dayEntries.length ? (
                  dayEntries.map((entry) => (
                    <button key={entry.id} className={`calendar-entry ${entry.tone}`} onClick={() => onOpenEntry(entry)} type="button">
                      <span>{entry.kind}</span>
                      <strong>{entry.title}</strong>
                      <p>{entry.project} · {entry.owner}</p>
                    </button>
                  ))
                ) : (
                  <p className="calendar-empty">등록 일정 없음</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RiskDecisionCenter({ items, onOpenItem, onToggleItem, setToast }) {
  const openItems = items.filter((item) => !item.resolved);
  const highItems = openItems.filter((item) => item.severity === '높음');
  const projectCount = new Set(openItems.map((item) => item.project)).size;

  return (
    <section className="panel decision-center-panel">
      <div className="panel-header">
        <div>
          <h2>확인·의사결정 센터</h2>
          <p>막힌 항목, 보완 산출물, 마감 전 정리가 필요한 업무를 묶어 봅니다.</p>
        </div>
        <button className="secondary-action" onClick={() => setToast('확인 항목 회의 아젠다 초안을 생성했습니다.')} type="button">
          <ClipboardCheck size={16} />
          회의 아젠다
        </button>
      </div>

      <div className="decision-summary-row">
        <article>
          <span>미해소</span>
          <strong>{openItems.length}건</strong>
        </article>
        <article>
          <span>확인 필요</span>
          <strong>{highItems.length}건</strong>
        </article>
        <article>
          <span>관련 과제</span>
          <strong>{projectCount}개</strong>
        </article>
      </div>

      <div className="decision-list">
        {items.slice(0, 9).map((item) => (
          <article key={item.id} className={item.resolved ? 'resolved' : ''}>
            <button className="decision-main" onClick={() => onOpenItem(item)} type="button">
              <span className={`decision-severity ${item.severity === '높음' ? 'high' : 'mid'}`}>{item.severity}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.project} · {item.subtitle}</p>
                <small>{item.owner} · {item.due}</small>
              </div>
            </button>
            <div className="decision-actions">
              <span>{item.category}</span>
              <button onClick={() => onToggleItem(item)} type="button">{item.resolved ? '재개' : '해소'}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CompletedWorkPanel({ logs, workItems, onOpenItem, onExportCsv, setToast }) {
  return (
    <div className="panel completed-panel">
      <div className="panel-header">
        <div>
          <h2>종결 업무 기록</h2>
          <p>마감 버튼으로 종결한 업무가 누적됩니다.</p>
        </div>
        <button onClick={() => onExportCsv('종결업무기록.csv', completedWorkCsvColumns, logs)} type="button">CSV</button>
      </div>
      <div className="completed-list">
        {logs.length ? (
          logs.slice(0, 6).map((log) => {
            const linkedItem = workItems.find((item) => item.id === log.itemId);
            return (
              <article key={log.id}>
                <span className="resolved-chip">
                  <Check size={14} />
                  종결
                </span>
                <div>
                  <strong>{log.task}</strong>
                  <p>{log.project} · {log.owner}</p>
                  <small>{log.completedAt} · {log.completedBy} · {log.note}</small>
                </div>
                <button
                  onClick={() => (linkedItem ? onOpenItem(linkedItem) : setToast('연결 업무가 현재 레지스터에 없습니다.'))}
                  type="button"
                >
                  열기
                </button>
              </article>
            );
          })
        ) : (
          <p className="empty-panel-copy">아직 종결된 업무가 없습니다. 상세 모달에서 마감 버튼을 누르면 여기에 기록됩니다.</p>
        )}
      </div>
    </div>
  );
}

export function App() {
  const [activeNav, setActiveNav] = useState('console');
  const sharedSaveTimerRef = useRef(null);
  const sharedSaveReadyRef = useRef(false);
  const [workItems, setWorkItems] = useState(() => sanitizeWorkItems(readLocalValue(STORAGE_KEY, seedWorkItems)));
  const [teamCheckins, setTeamCheckins] = useState(() => readLocalValue(CHECKIN_STORAGE_KEY, initialTeamCheckins));
  const [decisionResolutions, setDecisionResolutions] = useState(() => readLocalValue(DECISION_STORAGE_KEY, []));
  const [externalRequests, setExternalRequests] = useState(() => sanitizeExternalRequests(readLocalValue(EXTERNAL_REQUEST_STORAGE_KEY, seedExternalRequests)));
  const [testInstitutions, setTestInstitutions] = useState(() => sanitizeTestInstitutions(readLocalValue(TEST_INSTITUTION_STORAGE_KEY, initialTestInstitutions)));
  const [patents, setPatents] = useState(() => sanitizePatentHoldings(readLocalValue(PATENT_STORAGE_KEY, initialPatentHoldings)));
  const [budgetRows, setBudgetRows] = useState(() => sanitizeBudgetRows(readLocalValue(BUDGET_STORAGE_KEY, seedBudgetRows)));
  const [completedWorkLogs, setCompletedWorkLogs] = useState(() => readLocalValue(COMPLETED_WORK_STORAGE_KEY, initialCompletedWorkLogs));
  const [workComments, setWorkComments] = useState(() => readLocalValue(WORK_COMMENT_STORAGE_KEY, initialWorkComments));
  const [projectPortfolioItems, setProjectPortfolioItems] = useState(() =>
    sanitizeProjectPortfolioItems(readLocalValue(PROJECT_PORTFOLIO_STORAGE_KEY, seedProjectPortfolioItems))
  );
  const [projectTargetRows, setProjectTargetRows] = useState(() => sanitizeProjectTargetRows(readLocalValue(PROJECT_TARGET_STORAGE_KEY, seedProjectTargetRows)));
  const [executionPlans, setExecutionPlans] = useState(() => sanitizeExecutionPlans(readLocalValue(EXECUTION_PLAN_STORAGE_KEY, seedExecutionPlans)));
  const [equipmentItems, setEquipmentItems] = useState(() => sanitizeEquipmentItems(readLocalValue(EQUIPMENT_STORAGE_KEY, initialEquipmentItems)));
  const [testRequestItems, setTestRequestItems] = useState(() => sanitizeTestRequestItems(readLocalValue(TEST_REQUEST_STORAGE_KEY, seedTestRequestItems)));
  const [royaltyRowsState, setRoyaltyRowsState] = useState(() => sanitizeRoyaltyRows(readLocalValue(ROYALTY_STORAGE_KEY, outcomeRoyaltyRows)));
  const [labAdminRowsState, setLabAdminRowsState] = useState(() => sanitizeLabAdminRows(readLocalValue(LAB_ADMIN_STORAGE_KEY, labAdminRows)));
  const [selectedId, setSelectedId] = useState(seedWorkItems[0].id);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(seedProjectPortfolioItems[0].id);
  const [selectedExecutionProjectId, setSelectedExecutionProjectId] = useState(seedExecutionPlans[0].projectId);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(initialEquipmentItems[0].id);
  const [selectedTestRequestId, setSelectedTestRequestId] = useState(seedTestRequestItems[0].id);
  const [registerView, setRegisterView] = useState('table');
  const [registerSort, setRegisterSort] = useState({ key: 'due', direction: 'asc' });
  const [selectedTestInstitutionId, setSelectedTestInstitutionId] = useState(initialTestInstitutions[0].id);
  const [testInstitutionDraft, setTestInstitutionDraft] = useState(initialTestInstitutions[0]);
  const [selectedPatentId, setSelectedPatentId] = useState(initialPatentHoldings[0].id);
  const [patentDraft, setPatentDraft] = useState(initialPatentHoldings[0]);
  const [budgetProjectFilter, setBudgetProjectFilter] = useState('전체 과제');
  const [budgetYearFilter, setBudgetYearFilter] = useState('전체 연도');
  const [selectedBudgetId, setSelectedBudgetId] = useState(seedBudgetRows[0].id);
  const [budgetDraft, setBudgetDraft] = useState(seedBudgetRows[0]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [detailDraft, setDetailDraft] = useState(seedWorkItems[0]);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [isNewOpen, setNewOpen] = useState(false);
  const [newTaskContext, setNewTaskContext] = useState('console');
  const [isPortfolioEditOpen, setPortfolioEditOpen] = useState(false);
  const [isReportOpen, setReportOpen] = useState(false);
  const [isDossierOpen, setDossierOpen] = useState(false);
  const [domainLedgerType, setDomainLedgerType] = useState('');
  const [isAllocationOpen, setAllocationOpen] = useState(false);
  const [selectedMemberName, setSelectedMemberName] = useState('');
  const [reportKind, setReportKind] = useState('weekly');
  const [dateRangeIndex, setDateRangeIndex] = useState(0);
  const [dateSelection, setDateSelection] = useState({ start: '2026-06-09', end: '2026-12-31' });
  const [selectedProjectName, setSelectedProjectName] = useState('전체 프로젝트');
  const [activeUserName, setActiveUserName] = useState('김태현 과장');
  const [openTopMenu, setOpenTopMenu] = useState('');
  const [favoriteLinks, setFavoriteLinks] = useState(quickLinks);
  const [newTask, setNewTask] = useState({
    type: '연구개발과제',
    project: '',
    workCategory: '',
    task: '',
    owner: '김태현 과장',
    status: '작성',
    due: '2026-06-20',
    evidenceNeed: '신규 등록',
    institution: '-',
  });
  const [checkinDraft, setCheckinDraft] = useState({
    member: '김태현 과장',
    itemId: 'REQ-2026-061',
    summary: 'BSP 원료 합성 조건 보완 업무 현황을 입력합니다.',
    workStatus: '진행 중',
    blocker: '일부 분석 결과 회신 대기',
    nextAction: '조건별 순도 결과표 업데이트',
    evidence: 'BSP_실험계획표.xlsx, 원료합성_조건표.docx',
    objectiveSignals: deriveObjectiveSignalsFromItem(seedWorkItems[0]),
  });
  const [commentDraft, setCommentDraft] = useState({
    member: '박지수 대리',
    text: '',
  });
  const [sharedSync, setSharedSync] = useState({
    available: false,
    status: 'checking',
    message: '공유 저장소 확인 중',
  });
  const sharedStorageConfig = useMemo(() => getSharedStorageConfig(), []);

  const selectedItem = workItems.find((item) => item.id === selectedId) ?? workItems[0];
  const selectedMember = members.find((member) => member.name === selectedMemberName);
  const activeConfig = moduleConfigs[activeNav];
  const activeDateRange = `${dateSelection.start} ~ ${dateSelection.end}`;
  const newTaskTypeOptions = useMemo(
    () => (newTaskContext === 'console' ? Object.keys(typeColors) : moduleConfigs[newTaskContext]?.types ?? Object.keys(typeColors)),
    [newTaskContext]
  );
  const newTaskCategoryOptions = useMemo(() => getWorkCategoryOptions(newTaskContext, newTask.type), [newTask.type, newTaskContext]);
  const isAssetTaskModal = newTaskContext === 'assets';
  const operationalWorkloadItems = useMemo(
    () => buildOperationalWorkloadItems(workItems, royaltyRowsState, labAdminRowsState, equipmentItems, testRequestItems),
    [equipmentItems, labAdminRowsState, royaltyRowsState, testRequestItems, workItems]
  );
  const consoleWorkloadData = useMemo(() => buildConsoleWorkloadData(operationalWorkloadItems), [operationalWorkloadItems]);
  const reportDraft = useMemo(() => buildReportDraft(reportKind, workItems, selectedItem), [reportKind, workItems, selectedItem]);
  const calendarEntries = useMemo(() => buildCalendarEntries(workItems, externalRequests), [externalRequests, workItems]);
  const decisionItems = useMemo(
    () => buildDecisionItems(workItems).map((item) => ({ ...item, resolved: decisionResolutions.includes(item.id) })),
    [decisionResolutions, workItems]
  );
  const projectSummaries = useMemo(() => {
    return projectPortfolioItems
      .map((project) => {
        const name = project.name;
        const items = workItems.filter((item) => item.project === name);
        const sortedByDue = items.slice().sort((a, b) => a.due.localeCompare(b.due));
        const membersInProject = Array.from(new Set(items.flatMap((item) => [item.owner, item.coOwner]).filter((nameValue) => nameValue && nameValue !== '공동 담당자')));
        const typeCounts = items.reduce((counts, item) => ({ ...counts, [item.type]: (counts[item.type] ?? 0) + 1 }), {});
        const primaryType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? project.status;
        const gates = getProjectGates(name, items);
        const gateReadiness = gates.length ? Math.round(gates.reduce((sum, gate) => sum + gate.readiness, 0) / gates.length) : 0;
        const missingCount = gates.reduce((sum, gate) => sum + gate.missing.filter((item) => item !== '추가 보완 없음').length, 0);
        return {
          name,
          primaryType,
          items,
          gates,
          gateReadiness,
          missingCount,
          taskCount: items.length,
          dueSoon: items.filter((item) => daysLeft(item.due) <= 7).length,
          highRisk: items.filter((item) => item.risk === '높음').length,
          checkinCount: teamCheckins.filter((checkin) => checkin.project === name).length,
          requestCount: externalRequests.filter((request) => request.project === name).length,
          members: membersInProject.slice(0, 4),
          nextTask: sortedByDue[0],
        };
      })
      .sort((a, b) => b.highRisk - a.highRisk || b.dueSoon - a.dueSoon || a.name.localeCompare(b.name));
  }, [externalRequests, projectPortfolioItems, teamCheckins, workItems]);
  const projectScopeOptions = useMemo(() => ['전체 프로젝트', ...projectSummaries.map((project) => project.name)], [projectSummaries]);
  const relatedProjectItems = useMemo(
    () => workItems.filter((item) => item.project === selectedItem.project || item.id === selectedItem.id),
    [workItems, selectedItem]
  );
  const selectedComments = useMemo(() => workComments.filter((comment) => comment.itemId === selectedId), [selectedId, workComments]);
  const sharedStatePayload = useMemo(
    () => ({
      workItems,
      teamCheckins,
      decisionResolutions,
      externalRequests,
      testInstitutions,
      patents,
      budgetRows,
      completedWorkLogs,
      workComments,
      projectPortfolioItems,
      projectTargetRows,
      executionPlans,
      equipmentItems,
      testRequestItems,
      royaltyRows: royaltyRowsState,
      labAdminRows: labAdminRowsState,
    }),
    [
      budgetRows,
      completedWorkLogs,
      decisionResolutions,
      equipmentItems,
      executionPlans,
      externalRequests,
      patents,
      projectPortfolioItems,
      projectTargetRows,
      labAdminRowsState,
      royaltyRowsState,
      teamCheckins,
      testInstitutions,
      testRequestItems,
      workComments,
      workItems,
    ]
  );

  useEffect(() => {
    const tables = document.querySelectorAll('.work-table, .data-table');
    tables.forEach((table) => {
      const headers = Array.from(table.querySelectorAll('thead th')).map((header) => header.textContent.replace(/[▲▼↕]/g, '').trim() || '선택');
      table.querySelectorAll('tbody tr').forEach((row) => {
        Array.from(row.children).forEach((cell, index) => {
          if (cell instanceof HTMLElement) {
            cell.dataset.label = headers[index] ?? '항목';
          }
        });
      });
    });
  });

  useEffect(() => {
    let cancelled = false;
    setSharedSync((state) => ({ ...state, status: 'checking', message: sharedStorageConfig.loadingMessage }));

    async function loadSharedState() {
      try {
        const envelope = await loadSharedEnvelope(sharedStorageConfig);
        const nextState = normalizeSharedState(envelope);
        if (cancelled) return;

        const sanitizedWorkItems = sanitizeWorkItems(nextState.workItems);
        const sanitizedProjects = sanitizeProjectPortfolioItems(nextState.projectPortfolioItems);
        const sanitizedTargets = sanitizeProjectTargetRows(nextState.projectTargetRows);
        const sanitizedPlans = sanitizeExecutionPlans(nextState.executionPlans);
        const sanitizedRequests = sanitizeTestRequestItems(nextState.testRequestItems);
        const sanitizedTestInstitutions = sanitizeTestInstitutions(nextState.testInstitutions);
        const sanitizedExternalRequests = sanitizeExternalRequests(nextState.externalRequests);
        const sanitizedBudgetRows = sanitizeBudgetRows(nextState.budgetRows);
        const sanitizedPatents = sanitizePatentHoldings(nextState.patents);
        const sanitizedEquipmentItems = sanitizeEquipmentItems(nextState.equipmentItems);
        const sanitizedRoyaltyRows = sanitizeRoyaltyRows(nextState.royaltyRows);
        const sanitizedLabAdminRows = sanitizeLabAdminRows(nextState.labAdminRows);

        setWorkItems(sanitizedWorkItems);
        setTeamCheckins(nextState.teamCheckins);
        setDecisionResolutions(nextState.decisionResolutions);
        setExternalRequests(sanitizedExternalRequests);
        setTestInstitutions(sanitizedTestInstitutions);
        setPatents(sanitizedPatents);
        setBudgetRows(sanitizedBudgetRows);
        setCompletedWorkLogs(nextState.completedWorkLogs);
        setWorkComments(nextState.workComments);
        setProjectPortfolioItems(sanitizedProjects);
        setProjectTargetRows(sanitizedTargets);
        setExecutionPlans(sanitizedPlans);
        setEquipmentItems(sanitizedEquipmentItems);
        setTestRequestItems(sanitizedRequests);
        setRoyaltyRowsState(sanitizedRoyaltyRows);
        setLabAdminRowsState(sanitizedLabAdminRows);

        const nextSelectedItem = sanitizedWorkItems.find((item) => item.id === selectedId) ?? sanitizedWorkItems[0];
        if (nextSelectedItem) {
          setSelectedId(nextSelectedItem.id);
          setDetailDraft({ ...nextSelectedItem });
        }
        const nextTestInstitution = sanitizedTestInstitutions.find((item) => item.id === selectedTestInstitutionId) ?? sanitizedTestInstitutions[0];
        if (nextTestInstitution) {
          setSelectedTestInstitutionId(nextTestInstitution.id);
          setTestInstitutionDraft({ ...nextTestInstitution });
        }
        const nextPatent = sanitizedPatents.find((item) => item.id === selectedPatentId) ?? sanitizedPatents[0];
        if (nextPatent) {
          setSelectedPatentId(nextPatent.id);
          setPatentDraft({ ...nextPatent });
        }
        const nextBudget = sanitizedBudgetRows.find((item) => item.id === selectedBudgetId) ?? sanitizedBudgetRows[0];
        if (nextBudget) {
          setSelectedBudgetId(nextBudget.id);
          setBudgetDraft({ ...nextBudget });
        }
        setSelectedPortfolioId(sanitizedProjects[0]?.id ?? selectedPortfolioId);
        setSelectedExecutionProjectId(sanitizedPlans[0]?.projectId ?? selectedExecutionProjectId);
        setSelectedEquipmentId(sanitizedEquipmentItems[0]?.id ?? selectedEquipmentId);
        setSelectedTestRequestId(sanitizedRequests[0]?.id ?? selectedTestRequestId);

        sharedSaveReadyRef.current = true;
        setSharedSync({ available: true, status: 'online', message: sharedStorageConfig.onlineMessage });
      } catch {
        sharedSaveReadyRef.current = false;
        setSharedSync({ available: false, status: 'local', message: '개별 브라우저 저장' });
      }
    }

    loadSharedState();
    return () => {
      cancelled = true;
      window.clearTimeout(sharedSaveTimerRef.current);
    };
  }, [sharedStorageConfig]);

  useEffect(() => {
    if (!sharedSaveReadyRef.current || !sharedSync.available) return undefined;

    window.clearTimeout(sharedSaveTimerRef.current);
    setSharedSync((state) => ({ ...state, status: 'saving', message: sharedStorageConfig.savingMessage }));
    sharedSaveTimerRef.current = window.setTimeout(async () => {
      try {
        await saveSharedEnvelope(sharedStorageConfig, sharedStatePayload);
        setSharedSync({ available: true, status: 'online', message: sharedStorageConfig.savedMessage });
      } catch {
        sharedSaveReadyRef.current = false;
        setSharedSync({ available: false, status: 'local', message: sharedStorageConfig.lostMessage });
      }
    }, 650);

    return () => window.clearTimeout(sharedSaveTimerRef.current);
  }, [sharedStatePayload, sharedStorageConfig, sharedSync.available]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workItems));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [workItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CHECKIN_STORAGE_KEY, JSON.stringify(teamCheckins));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [teamCheckins]);

  useEffect(() => {
    try {
      window.localStorage.setItem(DECISION_STORAGE_KEY, JSON.stringify(decisionResolutions));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [decisionResolutions]);

  useEffect(() => {
    try {
      window.localStorage.setItem(EXTERNAL_REQUEST_STORAGE_KEY, JSON.stringify(externalRequests));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [externalRequests]);

  useEffect(() => {
    try {
      window.localStorage.setItem(TEST_INSTITUTION_STORAGE_KEY, JSON.stringify(testInstitutions));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [testInstitutions]);

  useEffect(() => {
    try {
      window.localStorage.setItem(PATENT_STORAGE_KEY, JSON.stringify(patents));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [patents]);

  useEffect(() => {
    try {
      window.localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgetRows));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [budgetRows]);

  useEffect(() => {
    try {
      window.localStorage.setItem(COMPLETED_WORK_STORAGE_KEY, JSON.stringify(completedWorkLogs));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [completedWorkLogs]);

  useEffect(() => {
    try {
      window.localStorage.setItem(WORK_COMMENT_STORAGE_KEY, JSON.stringify(workComments));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [workComments]);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROJECT_PORTFOLIO_STORAGE_KEY, JSON.stringify(projectPortfolioItems));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [projectPortfolioItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROJECT_TARGET_STORAGE_KEY, JSON.stringify(projectTargetRows));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [projectTargetRows]);

  useEffect(() => {
    try {
      window.localStorage.setItem(EXECUTION_PLAN_STORAGE_KEY, JSON.stringify(executionPlans));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [executionPlans]);

  useEffect(() => {
    try {
      window.localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(equipmentItems));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [equipmentItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(TEST_REQUEST_STORAGE_KEY, JSON.stringify(testRequestItems));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [testRequestItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ROYALTY_STORAGE_KEY, JSON.stringify(royaltyRowsState));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [royaltyRowsState]);

  useEffect(() => {
    try {
      window.localStorage.setItem(LAB_ADMIN_STORAGE_KEY, JSON.stringify(labAdminRowsState));
    } catch {
      // Persistence is a progressive enhancement for the local prototype.
    }
  }, [labAdminRowsState]);

  const filteredItems = useMemo(() => {
    return workItems.filter((item) => {
      const text = `${item.project} ${item.task} ${item.owner} ${item.type} ${item.institution}`.toLowerCase();
      const queryMatch = text.includes(filters.query.toLowerCase());
      const typeMatch = filters.type === '전체' || item.type === filters.type;
      const stageMatch = filters.stage === '전체 단계' || item.stage === filters.stage;
      const statusMatch = filters.status === '전체 상태' || item.status === filters.status;
      const ownerMatch = filters.owner === '전체 담당자' || item.owner === filters.owner || item.coOwner === filters.owner;
      const projectMatch = selectedProjectName === '전체 프로젝트' || item.project === selectedProjectName;
      return queryMatch && typeMatch && stageMatch && statusMatch && ownerMatch && projectMatch;
    });
  }, [workItems, filters, selectedProjectName]);
  const sortedFilteredItems = useMemo(() => sortRegisterItems(filteredItems, registerSort), [filteredItems, registerSort]);

  const metrics = useMemo(() => {
    const within = (maxDays) => workItems.filter((item) => daysLeft(item.due) <= maxDays).length;
    return [
      { label: '과제 마감', value: within(7), sub: '7일 이내 3건', icon: CalendarDays, tone: 'red' },
      { label: '지원사업 신청', value: workItems.filter((item) => item.type === '지원사업').length + 4, sub: '마감 임박 2건', icon: FilePlus2, tone: 'amber' },
      { label: '특허 기한', value: workItems.filter((item) => item.type === '특허/IP').length + 11, sub: '90일 이내 7건', icon: ShieldCheck, tone: 'red' },
      { label: '시험기관 응답', value: 6, sub: '7일 이상 2건', icon: FlaskConical, tone: 'amber' },
      { label: '예산 증빙', value: 11, sub: '미제출 4건', icon: Landmark, tone: 'amber' },
      { label: '법정 의무', value: 4, sub: '기한 경과 1건', icon: Archive, tone: 'red' },
    ];
  }, [workItems]);

  function chooseItem(item) {
    setSelectedId(item.id);
    setDetailDraft({ ...item });
  }

  function openDetailModal(item) {
    chooseItem(item);
    setDetailModalOpen(true);
  }

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  }

  function updateDraft(field, value) {
    setDetailDraft((draft) => ({ ...draft, [field]: value }));
  }

  function saveDraft(message = '업무 입력이 저장되었습니다.') {
    const normalizedDraft = {
      ...detailDraft,
      workCategory: normalizeWorkCategory('', detailDraft.type, detailDraft.workCategory),
      evidence: Array.isArray(detailDraft.evidence) ? detailDraft.evidence : toList(detailDraft.evidence),
    };
    setWorkItems((items) =>
      items.map((item) =>
        item.id === selectedId
          ? {
              ...item,
              ...normalizedDraft,
              lastUpdate: '06-08',
              status: normalizedDraft.status || item.status,
            }
          : item
      )
    );
    setDetailDraft(normalizedDraft);
    setSelectedProjectName(normalizedDraft.project);
    setFilters(DEFAULT_FILTERS);
    showToast(message);
  }

  function exportCsv(filename, columns, rows) {
    downloadCsv(filename, columns, rows);
    showToast(`${filename} 내려받기를 시작했습니다.`);
  }

  function completeWorkItem(item = selectedItem) {
    if (!item) return;
    if (item.status === '종결') {
      showToast('이미 종결된 업무입니다.');
      return;
    }

    const completedAt = '2026-06-09';
    const completedBy = activeUserName;
    const nextItem = {
      ...item,
      stage: '종결',
      status: '종결',
      risk: '낮음',
      blocker: '-',
      nextAction: '종결 기록 확인',
      lastUpdate: '06-09',
    };
    const nextLog = {
      id: `DONE-${Date.now()}`,
      itemId: item.id,
      completedAt,
      completedBy,
      type: item.type,
      project: item.project,
      task: item.task,
      owner: item.owner,
      note: item.nextAction && item.nextAction !== '종결 기록 확인' ? item.nextAction : '업무 마감 처리',
    };

    setWorkItems((items) => items.map((workItem) => (workItem.id === item.id ? nextItem : workItem)));
    setCompletedWorkLogs((logs) => [nextLog, ...logs]);
    if (selectedId === item.id) {
      setDetailDraft(nextItem);
    }
    showToast(`${item.task} 업무를 종결 기록에 누적했습니다.`);
  }

  function saveWorkItem(nextItem) {
    const normalizedItem = {
      ...nextItem,
      workCategory: normalizeWorkCategory('', nextItem.type, nextItem.workCategory),
      evidence: Array.isArray(nextItem.evidence) ? nextItem.evidence : toList(nextItem.evidence),
      evidenceNeed: nextItem.evidenceNeed || '신규 등록',
      institution: nextItem.institution || '-',
      status: nextItem.status || '작성',
      lastUpdate: '06-09',
    };

    setWorkItems((items) => items.map((item) => (item.id === normalizedItem.id ? { ...item, ...normalizedItem } : item)));
    if (selectedId === normalizedItem.id) {
      setDetailDraft((draft) => ({ ...draft, ...normalizedItem }));
    }
    showToast('업무 항목을 수정했습니다.');
  }

  function addWorkComment() {
    if (!commentDraft.text.trim()) {
      showToast('의견 내용을 입력해주세요.');
      return;
    }

    const nextComment = {
      id: `CMT-${Date.now()}`,
      itemId: selectedId,
      member: commentDraft.member,
      date: '2026-06-09',
      text: commentDraft.text.trim(),
    };
    setWorkComments((comments) => [nextComment, ...comments]);
    setCommentDraft((draft) => ({ ...draft, text: '' }));
    showToast(`${commentDraft.member} 의견을 업무에 추가했습니다.`);
  }

  function deleteWorkComment(comment) {
    if (comment.member !== activeUserName) {
      showToast('작성자만 의견을 삭제할 수 있습니다.');
      return;
    }
    setWorkComments((comments) => comments.filter((item) => item.id !== comment.id));
    showToast('담당자 의견을 삭제했습니다.');
  }

  function removeEvidence(file) {
    const nextEvidence = detailDraft.evidence.filter((item) => item !== file);
    updateDraft('evidence', nextEvidence);
    setWorkItems((items) => items.map((item) => (item.id === selectedId ? { ...item, evidence: nextEvidence } : item)));
    showToast(`${file} 첨부를 삭제했습니다.`);
  }

  function addFavorite() {
    const exists = favoriteLinks.some((link) => link.action === activeNav);
    if (exists) {
      showToast('이미 즐겨찾기에 있는 화면입니다.');
      return;
    }
    setFavoriteLinks((links) => [{ label: activeConfig?.title ?? '통합 콘솔', icon: activeConfig?.icon ?? Gauge, action: activeNav }, ...links]);
    showToast(`${activeConfig?.title ?? '통합 콘솔'}을 즐겨찾기에 추가했습니다.`);
  }

  function addProjectPortfolioItem() {
    const nextProject = createEmptyProjectPortfolioItem();
    setProjectPortfolioItems((items) => [nextProject, ...items]);
    setSelectedPortfolioId(nextProject.id);
    setSelectedProjectName(nextProject.name);
    setPortfolioEditOpen(true);
    showToast('새 과제 입력 창을 열었습니다.');
  }

  function savePortfolioProject(nextProject, nextTargetRows) {
    setProjectPortfolioItems((items) => {
      const exists = items.some((item) => item.id === nextProject.id);
      return exists ? items.map((item) => (item.id === nextProject.id ? nextProject : item)) : [nextProject, ...items];
    });
    setProjectTargetRows((rows) => [
      ...rows.filter((row) => row.projectId !== nextProject.id),
      ...nextTargetRows.map((row) => ({ ...row, projectId: nextProject.id })),
    ]);
    setSelectedPortfolioId(nextProject.id);
    setPortfolioEditOpen(false);
    showToast('과제 포트폴리오 정보를 저장했습니다.');
  }

  function deleteProjectPortfolioItem(projectId = selectedPortfolioId) {
    if (projectPortfolioItems.length <= 1) {
      showToast('마지막 과제는 삭제할 수 없습니다.');
      return;
    }
    const targetProject = projectPortfolioItems.find((item) => item.id === projectId);
    const nextProjects = projectPortfolioItems.filter((item) => item.id !== projectId);
    const nextSelected = nextProjects[0];
    setProjectPortfolioItems(nextProjects);
    setProjectTargetRows((rows) => rows.filter((row) => row.projectId !== projectId));
    setSelectedPortfolioId(nextSelected.id);
    if (targetProject?.name === selectedProjectName) {
      setSelectedProjectName('전체 프로젝트');
    }
    showToast('선택 과제를 포트폴리오에서 삭제했습니다.');
  }

  function deleteProjectPortfolioItems(projectIds = []) {
    if (!projectIds.length) {
      showToast('삭제할 과제를 선택해주세요.');
      return;
    }

    const idSet = new Set(projectIds);
    const nextProjects = projectPortfolioItems.filter((item) => !idSet.has(item.id));
    if (!nextProjects.length) {
      showToast('마지막 과제는 삭제할 수 없습니다.');
      return;
    }

    setProjectPortfolioItems(nextProjects);
    setProjectTargetRows((rows) => rows.filter((row) => !idSet.has(row.projectId)));
    setExecutionPlans((plans) => {
      const nextPlans = plans.filter((plan) => !idSet.has(plan.projectId));
      return nextPlans.length ? nextPlans : plans;
    });
    if (idSet.has(selectedPortfolioId)) setSelectedPortfolioId(nextProjects[0].id);
    if (idSet.has(selectedExecutionProjectId)) setSelectedExecutionProjectId(nextProjects[0].id);
    if (!nextProjects.some((project) => project.name === selectedProjectName)) setSelectedProjectName('전체 프로젝트');
    showToast(`${projectIds.length}개 과제를 삭제했습니다.`);
  }

  function updatePortfolioItem(id, field, value) {
    setProjectPortfolioItems((items) => items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    if (field === 'name' && id === selectedPortfolioId) {
      setSelectedProjectName(value || '신규 과제');
    }
  }

  function updateExecutionMonth(projectId, index, field, value) {
    setExecutionPlans((plans) =>
      plans.map((plan) =>
        plan.projectId === projectId
          ? {
              ...plan,
              monthly: plan.monthly.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)),
            }
          : plan
      )
    );
  }

  function saveExecutionSchedule(projectId, schedule) {
    const startMonth = Number(schedule.startMonth) || 6;
    const endMonth = Number(schedule.endMonth) || startMonth;
    const normalized = normalizeScheduleItem({
      ...schedule,
      startMonth: Math.min(startMonth, endMonth),
      endMonth: Math.max(startMonth, endMonth),
      title: schedule.title?.trim() ?? '',
      category: schedule.category?.trim() || '수행 항목',
      owner: schedule.owner || activeUserName,
      status: schedule.status || '계획',
      color: schedule.color || '#155eef',
    });

    setExecutionPlans((plans) =>
      plans.map((plan) => {
        if (plan.projectId !== projectId) return plan;
        const exists = plan.monthly.some((item) => normalizeScheduleItem(item).id === normalized.id);
        return {
          ...plan,
          monthly: exists
            ? plan.monthly.map((item) => (normalizeScheduleItem(item).id === normalized.id ? normalized : item))
            : [...plan.monthly, normalized],
        };
      })
    );
    showToast('월별 일정을 저장했습니다.');
  }

  function deleteExecutionSchedule(projectId, scheduleId) {
    setExecutionPlans((plans) =>
      plans.map((plan) =>
        plan.projectId === projectId
          ? {
              ...plan,
              monthly: plan.monthly.filter((item) => normalizeScheduleItem(item).id !== scheduleId),
            }
          : plan
      )
    );
    showToast('월별 일정을 삭제했습니다.');
  }

  function deleteExecutionSchedules(projectId, scheduleIds = []) {
    if (!scheduleIds.length) {
      showToast('삭제할 월별 일정을 선택해주세요.');
      return;
    }

    const idSet = new Set(scheduleIds);
    setExecutionPlans((plans) =>
      plans.map((plan) =>
        plan.projectId === projectId
          ? {
              ...plan,
              monthly: plan.monthly.filter((item) => !idSet.has(normalizeScheduleItem(item).id)),
            }
          : plan
      )
    );
    showToast(`${scheduleIds.length}개 월별 일정을 삭제했습니다.`);
  }

  function addExecutionTask(projectId) {
    const targetPlan = executionPlans.find((plan) => plan.projectId === projectId) ?? executionPlans[0];
    setSelectedProjectName(targetPlan.projectName);
    setFilters(DEFAULT_FILTERS);
    setNewTask({
      type: '연구개발과제',
      project: targetPlan.projectName,
      workCategory: getDefaultWorkCategory('execution', '연구개발과제'),
      task: '',
      owner: activeUserName,
      status: '작성',
      due: '2026-07-31',
      evidenceNeed: '신규 등록',
      institution: '-',
    });
    setNewTaskContext('execution');
    setNewOpen(true);
    showToast('선택 과제의 수행 업무 입력 창을 열었습니다.');
  }

  function updateEquipmentItem(id, field, value) {
    const nextValue = field === 'price'
      ? Number(value) || 0
      : field === 'workCategory'
        ? normalizeWorkCategory('budget', '예산·장비', value)
        : value;
    setEquipmentItems((items) => items.map((item) => (item.id === id ? { ...item, [field]: nextValue } : item)));
  }

  function updateEquipmentQuote(equipmentId, quoteIndex, field, value) {
    setEquipmentItems((items) =>
      items.map((item) =>
        item.id === equipmentId
          ? {
              ...item,
              quotes: item.quotes.map((quote, index) =>
                index === quoteIndex ? { ...quote, [field]: field.includes('Price') ? Number(value) || 0 : value } : quote
              ),
            }
          : item
      )
    );
  }

  function addEquipmentSpec(equipmentId) {
    const nextSpec = `세부스펙${Date.now().toString().slice(-3)}`;
    setEquipmentItems((items) =>
      items.map((item) =>
        item.id === equipmentId
          ? {
              ...item,
              quoteSpecs: [...item.quoteSpecs, nextSpec],
              quotes: item.quotes.map((quote) => ({ ...quote, specs: { ...(quote.specs ?? {}), [nextSpec]: '' } })),
            }
          : item
      )
    );
    showToast('비교견적 세부 스펙 행을 추가했습니다.');
  }

  function updateEquipmentSpec(equipmentId, quoteIndex, specName, value) {
    setEquipmentItems((items) =>
      items.map((item) =>
        item.id === equipmentId
          ? {
              ...item,
              quotes: item.quotes.map((quote, index) =>
                index === quoteIndex ? { ...quote, specs: { ...(quote.specs ?? {}), [specName]: value } } : quote
              ),
            }
          : item
      )
    );
  }

  function renameEquipmentSpec(equipmentId, specName, nextSpecName) {
    const trimmedName = nextSpecName.trim();
    if (!trimmedName) return;
    setEquipmentItems((items) =>
      items.map((item) => {
        if (item.id !== equipmentId) return item;
        if (item.quoteSpecs.includes(trimmedName) && trimmedName !== specName) return item;
        return {
          ...item,
          quoteSpecs: item.quoteSpecs.map((spec) => (spec === specName ? trimmedName : spec)),
          quotes: item.quotes.map((quote) => {
            const currentSpecs = quote.specs ?? {};
            const { [specName]: previousValue, ...restSpecs } = currentSpecs;
            return {
              ...quote,
              specs: {
                ...restSpecs,
                [trimmedName]: previousValue ?? currentSpecs[trimmedName] ?? '',
              },
            };
          }),
        };
      })
    );
  }

  function addEquipmentItem(item) {
    setEquipmentItems((items) => [item, ...items]);
    setSelectedEquipmentId(item.id);
    showToast('새 장비 도입 정보를 추가했습니다.');
  }

  function deleteEquipmentItems(equipmentIds = []) {
    if (!equipmentIds.length) {
      showToast('삭제할 장비를 선택해주세요.');
      return;
    }

    const idSet = new Set(equipmentIds);
    const nextItems = equipmentItems.filter((item) => !idSet.has(item.id));
    if (!nextItems.length) {
      showToast('마지막 장비 항목은 삭제할 수 없습니다.');
      return;
    }

    setEquipmentItems(nextItems);
    if (idSet.has(selectedEquipmentId)) setSelectedEquipmentId(nextItems[0].id);
    showToast(`${equipmentIds.length}개 장비 항목을 삭제했습니다.`);
  }

  function updateTestRequest(id, field, value) {
    setTestRequestItems((items) => items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  }

  function addTestRequest(item) {
    const normalizedItem = {
      ...item,
      workCategory: normalizeWorkCategory('test', '시험·분석 의뢰', item.workCategory),
      images: Array.isArray(item.images) ? item.images : toList(item.images),
    };
    setTestRequestItems((items) => [normalizedItem, ...items]);
    setSelectedTestRequestId(normalizedItem.id);
    showToast('새 시험·분석 의뢰를 추가했습니다.');
  }

  function saveTestRequest(item) {
    const normalizedItem = {
      ...item,
      workCategory: normalizeWorkCategory('test', '시험·분석 의뢰', item.workCategory),
      images: Array.isArray(item.images) ? item.images : toList(item.images),
    };
    setTestRequestItems((items) => items.map((request) => (request.id === normalizedItem.id ? normalizedItem : request)));
    setSelectedTestRequestId(normalizedItem.id);
    showToast('시험·분석 의뢰 항목을 수정했습니다.');
  }

  function deleteTestRequests(requestIds = []) {
    if (!requestIds.length) {
      showToast('삭제할 시험·분석 의뢰를 선택해주세요.');
      return;
    }

    const idSet = new Set(requestIds);
    const nextItems = testRequestItems.filter((item) => !idSet.has(item.id));
    setTestRequestItems(nextItems);
    if (idSet.has(selectedTestRequestId)) setSelectedTestRequestId(nextItems[0]?.id ?? '');
    showToast(`${requestIds.length}개 시험·분석 의뢰를 삭제했습니다.`);
  }

  function addRoyaltyRow(row) {
    const normalizedRow = normalizeRoyaltyRow(row);
    setRoyaltyRowsState((rows) => [normalizedRow, ...rows]);
    showToast('성과·기술료 항목을 추가했습니다.');
  }

  function saveRoyaltyRow(row) {
    const normalizedRow = normalizeRoyaltyRow(row);
    setRoyaltyRowsState((rows) => rows.map((item) => (item.id === normalizedRow.id ? normalizedRow : item)));
    showToast('성과·기술료 항목을 수정했습니다.');
  }

  function deleteRoyaltyRows(rowIds = []) {
    if (!rowIds.length) {
      showToast('삭제할 성과·기술료 항목을 선택해주세요.');
      return;
    }

    const idSet = new Set(rowIds);
    setRoyaltyRowsState((rows) => rows.filter((row) => !idSet.has(row.id)));
    showToast(`${rowIds.length}개 성과·기술료 항목을 삭제했습니다.`);
  }

  function addLabAdminRow(row) {
    const normalizedRow = normalizeLabAdminRow(row);
    setLabAdminRowsState((rows) => [normalizedRow, ...rows]);
    showToast('연구소 행정 항목을 추가했습니다.');
  }

  function saveLabAdminRow(row) {
    const normalizedRow = normalizeLabAdminRow(row);
    setLabAdminRowsState((rows) => rows.map((item) => (item.id === normalizedRow.id ? normalizedRow : item)));
    showToast('연구소 행정 항목을 수정했습니다.');
  }

  function deleteLabAdminRows(rowIds = []) {
    if (!rowIds.length) {
      showToast('삭제할 연구소 행정 항목을 선택해주세요.');
      return;
    }

    const idSet = new Set(rowIds);
    setLabAdminRowsState((rows) => rows.filter((row) => !idSet.has(row.id)));
    showToast(`${rowIds.length}개 연구소 행정 항목을 삭제했습니다.`);
  }

  function selectTestInstitution(institution) {
    setSelectedTestInstitutionId(institution.id);
    setTestInstitutionDraft({ ...institution });
  }

  function updateTestInstitutionRow(id, field, value) {
    setTestInstitutions((items) =>
      items
        .map((item) => (item.id === id ? { ...item, [field]: field === 'seq' ? Number(value) || '' : value } : item))
        .sort((a, b) => Number(a.seq) - Number(b.seq))
    );
    if (selectedTestInstitutionId === id) {
      setTestInstitutionDraft((draft) => ({ ...draft, [field]: field === 'seq' ? Number(value) || '' : value }));
    }
  }

  function updateTestInstitutionDraft(field, value) {
    const nextValue = field === 'seq' ? Number(value) || '' : value;
    setTestInstitutionDraft((draft) => ({ ...draft, [field]: nextValue }));
    setTestInstitutions((items) =>
      items
        .map((item) => (item.id === selectedTestInstitutionId ? { ...item, [field]: nextValue } : item))
        .sort((a, b) => Number(a.seq) - Number(b.seq))
    );
  }

  function saveTestInstitution(event) {
    event.preventDefault();
    if (!testInstitutionDraft.institution.trim() || !testInstitutionDraft.testItem.trim()) {
      showToast('기관명과 시험 항목을 입력해주세요.');
      return false;
    }

    const normalized = {
      ...testInstitutionDraft,
      seq: Number(testInstitutionDraft.seq) || testInstitutions.length + 1,
    };
    setTestInstitutions((items) => {
      const exists = items.some((item) => item.id === normalized.id);
      const nextItems = exists ? items.map((item) => (item.id === normalized.id ? normalized : item)) : [...items, normalized];
      return nextItems.slice().sort((a, b) => Number(a.seq) - Number(b.seq));
    });
    setSelectedTestInstitutionId(normalized.id);
    setTestInstitutionDraft(normalized);
    showToast('시험 의뢰기관 정보를 저장했습니다.');
    return true;
  }

  function addTestInstitution() {
    const nextDraft = createEmptyTestInstitution(testInstitutions.length + 1);
    setTestInstitutions((items) => [...items, nextDraft]);
    setSelectedTestInstitutionId(nextDraft.id);
    setTestInstitutionDraft(nextDraft);
    showToast('새 시험 의뢰기관 행을 추가했습니다.');
  }

  function deleteTestInstitution() {
    if (testInstitutions.length <= 1) {
      showToast('마지막 시험 의뢰기관은 삭제할 수 없습니다.');
      return;
    }

    const nextItems = testInstitutions.filter((item) => item.id !== selectedTestInstitutionId);
    const nextSelected = nextItems[0];
    setTestInstitutions(nextItems.map((item, index) => ({ ...item, seq: index + 1 })));
    setSelectedTestInstitutionId(nextSelected.id);
    setTestInstitutionDraft({ ...nextSelected, seq: 1 });
    showToast('시험 의뢰기관을 삭제했습니다.');
  }

  function deleteTestInstitutions(institutionIds = []) {
    if (!institutionIds.length) {
      showToast('삭제할 시험 의뢰기관을 선택해주세요.');
      return;
    }

    const idSet = new Set(institutionIds);
    const nextItems = testInstitutions.filter((item) => !idSet.has(item.id));
    if (!nextItems.length) {
      showToast('마지막 시험 의뢰기관은 삭제할 수 없습니다.');
      return;
    }

    const reindexed = nextItems.map((item, index) => ({ ...item, seq: index + 1 }));
    const nextSelected = idSet.has(selectedTestInstitutionId) ? reindexed[0] : reindexed.find((item) => item.id === selectedTestInstitutionId) ?? reindexed[0];
    setTestInstitutions(reindexed);
    setSelectedTestInstitutionId(nextSelected.id);
    setTestInstitutionDraft({ ...nextSelected });
    showToast(`${institutionIds.length}개 시험 의뢰기관을 삭제했습니다.`);
  }

  function selectPatent(patent) {
    setSelectedPatentId(patent.id);
    setPatentDraft({ ...patent });
  }

  function updatePatentDraft(field, value) {
    setPatentDraft((draft) => ({ ...draft, [field]: value }));
  }

  function savePatent(event) {
    event.preventDefault();
    if (!patentDraft.title.trim()) {
      showToast('발명의 명칭을 입력해주세요.');
      return false;
    }

    const normalizedPatent = { ...patentDraft };
    setPatents((items) => {
      const exists = items.some((item) => item.id === normalizedPatent.id);
      return exists ? items.map((item) => (item.id === normalizedPatent.id ? normalizedPatent : item)) : [normalizedPatent, ...items];
    });
    setPatentDraft(normalizedPatent);
    setSelectedPatentId(normalizedPatent.id);
    showToast('특허 보유 현황을 저장했습니다.');
    return true;
  }

  function addPatent() {
    const nextDraft = createEmptyPatentHolding();
    setSelectedPatentId(nextDraft.id);
    setPatentDraft(nextDraft);
    showToast('새 특허 정보 입력을 시작합니다.');
  }

  function deletePatents(patentIds = []) {
    if (!patentIds.length) {
      showToast('삭제할 특허를 선택해주세요.');
      return;
    }

    const idSet = new Set(patentIds);
    const nextItems = patents.filter((item) => !idSet.has(item.id));
    setPatents(nextItems);
    if (idSet.has(selectedPatentId)) {
      const nextPatent = nextItems[0] ?? createEmptyPatentHolding();
      setSelectedPatentId(nextPatent.id);
      setPatentDraft({ ...nextPatent });
    }
    showToast(`${patentIds.length}개 특허 항목을 삭제했습니다.`);
  }

  function selectBudgetRow(row) {
    setSelectedBudgetId(row.id);
    setBudgetDraft({ ...row });
  }

  function updateBudgetDraft(field, value) {
    setBudgetDraft((draft) => ({ ...draft, [field]: value }));
  }

  function saveBudgetRow(event) {
    event.preventDefault();
    if (!budgetDraft.project.trim() || !budgetDraft.year.trim()) {
      showToast('과제와 연도를 입력해주세요.');
      return false;
    }

    setBudgetRows((rows) => {
      const exists = rows.some((row) => row.id === budgetDraft.id);
      return exists ? rows.map((row) => (row.id === budgetDraft.id ? budgetDraft : row)) : [budgetDraft, ...rows];
    });
    setSelectedBudgetId(budgetDraft.id);
    setBudgetProjectFilter('전체 과제');
    setBudgetYearFilter('전체 연도');
    showToast('연구비 총괄표를 저장했습니다.');
    return true;
  }

  function addBudgetRow() {
    const nextDraft = createEmptyBudgetRow();
    setSelectedBudgetId(nextDraft.id);
    setBudgetDraft(nextDraft);
    setBudgetProjectFilter('전체 과제');
    setBudgetYearFilter('전체 연도');
    showToast('새 연구비 입력을 시작합니다.');
  }

  function deleteBudgetRows(rowIds = []) {
    if (!rowIds.length) {
      showToast('삭제할 연구비 행을 선택해주세요.');
      return;
    }

    const idSet = new Set(rowIds);
    const nextRows = budgetRows.filter((row) => !idSet.has(row.id));
    setBudgetRows(nextRows);
    if (idSet.has(selectedBudgetId)) {
      const nextBudget = nextRows[0] ?? createEmptyBudgetRow();
      setSelectedBudgetId(nextBudget.id);
      setBudgetDraft({ ...nextBudget });
      setBudgetProjectFilter('전체 과제');
      setBudgetYearFilter('전체 연도');
    }
    showToast(`${rowIds.length}개 연구비 행을 삭제했습니다.`);
  }

  function updateCheckinDraft(field, value) {
    setCheckinDraft((draft) => {
      const next = { ...draft, [field]: value };
      if (field === 'member') {
        const firstItem = workItems.find((item) => item.owner === value || item.coOwner === value) ?? workItems[0];
        return {
          ...next,
          itemId: firstItem.id,
          summary: `${firstItem.task} 업무 현황을 입력합니다.`,
          workStatus: firstItem.status,
          blocker: firstItem.blocker,
          nextAction: firstItem.nextAction,
          evidence: firstItem.evidence.join(', '),
          objectiveSignals: deriveObjectiveSignalsFromItem(firstItem),
        };
      }
      if (field === 'itemId') {
        const item = workItems.find((workItem) => workItem.id === value);
        if (!item) return next;
        return {
          ...next,
          summary: `${item.task} 업무 현황을 입력합니다.`,
          workStatus: item.status,
          blocker: item.blocker,
          nextAction: item.nextAction,
          evidence: item.evidence.join(', '),
          objectiveSignals: deriveObjectiveSignalsFromItem(item),
        };
      }
      return next;
    });
  }

  function submitTeamCheckin(event) {
    event.preventDefault();
    const targetItem = workItems.find((item) => item.id === checkinDraft.itemId);
    if (!targetItem || !checkinDraft.summary.trim()) {
      showToast('연결 업무와 진행 요약을 확인해주세요.');
      return;
    }

    const nextCheckin = {
      id: `CHK-${Date.now()}`,
      date: '2026-06-08',
      member: checkinDraft.member,
      itemId: targetItem.id,
      project: targetItem.project,
      task: targetItem.task,
      summary: checkinDraft.summary,
      workStatus: checkinDraft.workStatus || targetItem.status,
      blocker: checkinDraft.blocker || '-',
      nextAction: checkinDraft.nextAction || '다음 액션 입력 필요',
      evidence: checkinDraft.evidence || '-',
      objectiveSignals: {
        ...deriveObjectiveSignalsFromItem(targetItem),
        ...checkinDraft.objectiveSignals,
      },
      status: '입력됨',
    };

    const nextEvidence = checkinDraft.evidence
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    setTeamCheckins((checkins) => [nextCheckin, ...checkins]);
    setWorkItems((items) =>
      items.map((item) =>
        item.id === targetItem.id
          ? {
              ...item,
              blocker: checkinDraft.blocker || '-',
              nextAction: checkinDraft.nextAction || item.nextAction,
              evidence: nextEvidence.length ? nextEvidence : item.evidence,
              memo: checkinDraft.summary,
              status: checkinDraft.workStatus || item.status,
              lastUpdate: '06-08',
            }
          : item
      )
    );
    if (selectedId === targetItem.id) {
      setDetailDraft((draft) => ({
        ...draft,
        blocker: checkinDraft.blocker || '-',
        nextAction: checkinDraft.nextAction || draft.nextAction,
        evidence: nextEvidence.length ? nextEvidence : draft.evidence,
        memo: checkinDraft.summary,
        status: checkinDraft.workStatus || draft.status,
        lastUpdate: '06-08',
      }));
    }
    showToast(`${checkinDraft.member}님의 주간 체크인을 저장했습니다.`);
  }

  function advanceCheckinStatus(id) {
    const flow = ['입력됨', '확인됨', '보고 반영'];
    setTeamCheckins((checkins) =>
      checkins.map((checkin) => {
        if (checkin.id !== id) return checkin;
        const next = flow[(flow.indexOf(checkin.status) + 1) % flow.length];
        return { ...checkin, status: next };
      })
    );
    showToast('체크인 확인 상태를 업데이트했습니다.');
  }

  function addEvidence() {
    const nextEvidence = [...detailDraft.evidence, `추가증빙_${detailDraft.evidence.length + 1}.pdf`];
    updateDraft('evidence', nextEvidence);
  }

  function resetFilters(message = '필터를 초기화했습니다.') {
    setFilters(DEFAULT_FILTERS);
    setSelectedProjectName('전체 프로젝트');
    showToast(message);
  }

  function refreshRegister() {
    const first = workItems[0];
    setFilters(DEFAULT_FILTERS);
    setSelectedProjectName('전체 프로젝트');
    if (first) chooseItem(first);
    showToast('업무 레지스터를 최신 상태로 정리했습니다.');
  }

  function toggleRegisterSort(key) {
    setRegisterSort((sort) => ({
      key,
      direction: sort.key === key && sort.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  function deleteSelectedItem() {
    if (workItems.length <= 1) {
      showToast('마지막 업무는 삭제할 수 없습니다.');
      return;
    }

    const deletedItem = selectedItem;
    const nextItems = workItems.filter((item) => item.id !== selectedId);
    const nextSelected = nextItems[0];
    setWorkItems(nextItems);
    setTeamCheckins((checkins) => checkins.filter((checkin) => checkin.itemId !== selectedId));
    setWorkComments((comments) => comments.filter((comment) => comment.itemId !== selectedId));
    setSelectedId(nextSelected.id);
    setDetailDraft({ ...nextSelected });
    if (!nextItems.some((item) => item.project === deletedItem.project)) {
      setSelectedProjectName('전체 프로젝트');
    }
    showToast('선택 업무와 연결 체크인을 삭제했습니다.');
  }

  function deleteWorkItems(workItemIds = []) {
    if (!workItemIds.length) {
      showToast('삭제할 업무를 선택해주세요.');
      return;
    }

    const idSet = new Set(workItemIds);
    const nextItems = workItems.filter((item) => !idSet.has(item.id));
    if (!nextItems.length) {
      showToast('마지막 업무는 삭제할 수 없습니다.');
      return;
    }

    setWorkItems(nextItems);
    setTeamCheckins((checkins) => checkins.filter((checkin) => !idSet.has(checkin.itemId)));
    setWorkComments((comments) => comments.filter((comment) => !idSet.has(comment.itemId)));
    if (idSet.has(selectedId)) {
      const nextSelected = nextItems[0];
      setSelectedId(nextSelected.id);
      setDetailDraft({ ...nextSelected });
    }
    if (!nextItems.some((item) => item.project === selectedProjectName)) {
      setSelectedProjectName('전체 프로젝트');
    }
    showToast(`${workItemIds.length}개 업무와 연결 기록을 삭제했습니다.`);
  }

  function handleShortcut(action) {
    setOpenTopMenu('');
    if (action === 'report') {
      setReportOpen(true);
      showToast('주간 업무보고 초안 창을 열었습니다.');
      return;
    }
    setActiveNav(action);
    showToast(`${moduleConfigs[action].title} 화면으로 이동했습니다.`);
  }

  function handleNavChange(navId) {
    setOpenTopMenu('');
    setActiveNav(navId);
  }

  function cycleDateRange() {
    setDateRangeIndex((index) => (index + 1) % dateRanges.length);
    showToast('기간 기준을 변경했습니다.');
  }

  function selectProjectScope(projectName) {
    setSelectedProjectName(projectName);
    setFilters(DEFAULT_FILTERS);
    const found = workItems.find((item) => item.project === projectName);
    if (found) chooseItem(found);
    showToast(projectName === '전체 프로젝트' ? '전체 과제 기준으로 전환했습니다.' : `${projectName} 과제 기준으로 업무를 필터링했습니다.`);
  }

  function selectStatusScope(status) {
    setFilters((state) => ({ ...state, status }));
    showToast(status === '전체 상태' ? '전체 상태 기준으로 전환했습니다.' : `${status} 상태 업무만 표시합니다.`);
  }

  function selectDomainScope(type) {
    const scopedItems = selectedProjectName === '전체 프로젝트' ? workItems : workItems.filter((item) => item.project === selectedProjectName);
    const firstItem = scopedItems.find((item) => item.type === type);
    setFilters((state) => ({ ...state, type, status: '전체 상태' }));
    if (firstItem) chooseItem(firstItem);
    showToast(firstItem ? `${type} 업무를 레지스터에 표시했습니다.` : `${selectedProjectName} 안에는 ${type} 업무가 아직 없습니다.`);
  }

  function selectRoleCoverage(coverage) {
    const scopedItems = selectedProjectName === '전체 프로젝트' ? workItems : workItems.filter((item) => item.project === selectedProjectName);
    const firstItem = scopedItems.find((item) => matchesRoleCoverage(item, coverage));
    setFilters((state) => ({ ...state, type: coverage.filterType, status: '전체 상태', query: '' }));
    if (firstItem) chooseItem(firstItem);
    showToast(firstItem ? `${coverage.title} 연결 업무를 레지스터에 표시했습니다.` : `${coverage.title} 연결 업무가 아직 없습니다.`);
  }

  function selectMemberScope(memberName) {
    const scopedItems = selectedProjectName === '전체 프로젝트' ? workItems : workItems.filter((item) => item.project === selectedProjectName);
    const firstItem = scopedItems.find((item) => item.owner === memberName || item.coOwner === memberName);
    setFilters((state) => ({ ...state, owner: memberName, status: '전체 상태', query: '' }));
    if (firstItem) chooseItem(firstItem);
    showToast(firstItem ? `${memberName} 담당/공동담당 업무를 레지스터에 표시했습니다.` : `${memberName}님의 연결 업무가 아직 없습니다.`);
  }

  function cycleProjectScope() {
    const currentIndex = projectScopeOptions.indexOf(selectedProjectName);
    const nextProject = projectScopeOptions[(currentIndex + 1) % projectScopeOptions.length];
    selectProjectScope(nextProject);
  }

  function openProjectDossier(projectName) {
    const found = workItems.find((item) => item.project === projectName);
    if (!found) {
      showToast(`${projectName} 과제 업무가 아직 없습니다.`);
      return;
    }
    setSelectedProjectName(projectName);
    chooseItem(found);
    setDossierOpen(true);
    showToast(`${projectName} 과제 대장을 열었습니다.`);
  }

  function openCalendarEntry(entry) {
    const item = entry.itemId ? workItems.find((workItem) => workItem.id === entry.itemId) : workItems.find((workItem) => workItem.project === entry.project);
    if (item) {
      setSelectedProjectName(entry.project);
      setFilters(DEFAULT_FILTERS);
      chooseItem(item);
      showToast(`${entry.title} 일정을 선택했습니다.`);
      return;
    }
    selectProjectScope(entry.project);
  }

  function openDecisionItem(item) {
    const found = item.itemId ? workItems.find((workItem) => workItem.id === item.itemId) : workItems.find((workItem) => workItem.project === item.project);
    if (found) {
      setSelectedProjectName(item.project);
      setFilters(DEFAULT_FILTERS);
      chooseItem(found);
      showToast(`${item.category} 항목을 업무 상세에 열었습니다.`);
      return;
    }
    selectProjectScope(item.project);
  }

  function toggleDecisionItem(item) {
    const isResolved = decisionResolutions.includes(item.id);
    setDecisionResolutions((items) => (isResolved ? items.filter((id) => id !== item.id) : [item.id, ...items]));

    if (!isResolved && item.itemId) {
      setWorkItems((items) =>
        items.map((workItem) =>
          workItem.id === item.itemId
            ? {
                ...workItem,
                risk: '낮음',
                blocker: '-',
                status: workItem.status === '보완 필요' ? '진행 중' : workItem.status,
                lastUpdate: '06-08',
              }
            : workItem
        )
      );
      if (selectedId === item.itemId) {
        setDetailDraft((draft) => ({
          ...draft,
          risk: '낮음',
          blocker: '-',
          status: draft.status === '보완 필요' ? '진행 중' : draft.status,
          lastUpdate: '06-08',
        }));
      }
    }

    showToast(isResolved ? '확인 항목을 다시 열었습니다.' : '확인 항목을 처리했습니다.');
  }

  function advanceExternalRequest(id) {
    const flow = ['자료 요청', '회신 대기', '처리 중', '회신 완료'];
    setExternalRequests((requests) =>
      requests.map((request) => {
        if (request.id !== id) return request;
        const next = flow[(flow.indexOf(request.status) + 1) % flow.length];
        return { ...request, status: next };
      })
    );
    showToast('외부기관 요청 상태를 업데이트했습니다.');
  }

  function chooseProject(projectName) {
    const found = workItems.find((item) => item.project === projectName);
    if (found) {
      setSelectedProjectName(projectName);
      setFilters(DEFAULT_FILTERS);
      chooseItem(found);
      showToast(`${projectName} 관련 업무를 선택했습니다.`);
    } else {
      showToast(`${projectName} 관련 업무가 아직 등록되지 않았습니다.`);
    }
  }

  function createTask() {
    const isAssetTask = newTaskContext === 'assets';
    if ((!isAssetTask && !newTask.project.trim()) || !newTask.task.trim()) {
      showToast(isAssetTask ? '업무명을 입력해주세요.' : '과제명과 업무명을 입력해주세요.');
      return;
    }

    const resolvedProject = isAssetTask ? '자료 제작' : newTask.project;
    const item = {
      id: `REQ-2026-${String(70 + workItems.length).padStart(3, '0')}`,
      type: newTask.type,
      project: resolvedProject,
      workCategory: normalizeWorkCategory(newTaskContext, newTask.type, newTask.workCategory),
      task: newTask.task,
      owner: newTask.owner,
      coOwner: '공동 담당자',
      stage: '계획',
      due: newTask.due,
      evidence: [],
      evidenceNeed: newTask.evidenceNeed || '신규 등록',
      institution: newTask.institution || '-',
      risk: '중',
      status: newTask.status || '작성',
      lastUpdate: '06-08',
      memo: '새 업무가 등록되었습니다. 담당자가 세부 내용을 입력해야 합니다.',
      blocker: '-',
      nextAction: '세부 계획 입력',
      export: 'DOCX',
    };
    setWorkItems((items) => [item, ...items]);
    setSelectedId(item.id);
    setDetailDraft(item);
    setSelectedProjectName(isAssetTask ? '전체 프로젝트' : item.project);
    setFilters(DEFAULT_FILTERS);
    setNewOpen(false);
    showToast('새 업무가 등록되었습니다.');
  }

  function openModuleTaskInput() {
    const defaultType = activeConfig?.types?.[0] ?? '연구개발과제';
    const defaultProject = selectedProjectName === '전체 프로젝트' ? '' : selectedProjectName;
    setNewTask({
      type: defaultType,
      project: activeNav === 'assets' ? '자료 제작' : defaultProject,
      workCategory: getDefaultWorkCategory(activeNav, defaultType),
      task: '',
      owner: activeUserName,
      status: '작성',
      due: '2026-07-31',
      evidenceNeed: '신규 등록',
      institution: '-',
    });
    setNewTaskContext(activeNav);
    setNewOpen(true);
    showToast(`${activeConfig?.title ?? '업무'} 입력 창을 열었습니다.`);
  }

  function handlePrimaryAction() {
    setOpenTopMenu('');
    if (activeNav === 'portfolio') {
      addProjectPortfolioItem();
      return;
    }
    setNewTask((task) => ({
      ...task,
      workCategory: task.workCategory || getDefaultWorkCategory('console', task.type),
      status: task.status || '작성',
      evidenceNeed: task.evidenceNeed || '신규 등록',
      institution: task.institution || '-',
    }));
    setNewTaskContext('console');
    setNewOpen(true);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="주요 메뉴">
        <div className="brand">
          <div className="brand-mark">
            <Layers3 size={20} />
          </div>
          <div>
            <strong>R&D Project</strong>
            <span>Operations OS</span>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => handleNavChange(item.id)}
                type="button"
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-section">
          <div className="sidebar-title">
            <span>즐겨찾기</span>
            <button className="icon-button sm" onClick={addFavorite} type="button" aria-label="즐겨찾기 추가">
              <Plus size={15} />
            </button>
          </div>
          {favoriteLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button key={link.label} className="shortcut" onClick={() => handleShortcut(link.action)} type="button">
                <Icon size={15} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>

        <button className="settings" onClick={() => showToast('알림, 내보내기, 팀 입력 기준 설정을 열었습니다.')} type="button">
          <Settings size={16} />
          <span>설정</span>
        </button>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <h1>{activeConfig?.title ?? '통합 콘솔'}</h1>
            <p>{activeConfig?.subtitle ?? '2026.06.08 월 · 김태현 과장님, 오늘도 좋은 하루 되세요.'}</p>
          </div>

          <div className="top-actions">
            <div className="top-select-wrap">
              <button className="select-like" onClick={() => setOpenTopMenu(openTopMenu === 'date' ? '' : 'date')} type="button">
                {activeDateRange}
                <ChevronDown size={15} />
              </button>
              {openTopMenu === 'date' && (
                <div className="top-select-menu date-menu">
                  <label>
                    시작일
                    <input type="date" value={dateSelection.start} onChange={(event) => setDateSelection((state) => ({ ...state, start: event.target.value }))} />
                  </label>
                  <label>
                    종료일
                    <input type="date" value={dateSelection.end} onChange={(event) => setDateSelection((state) => ({ ...state, end: event.target.value }))} />
                  </label>
                  <button
                    className="active"
                    onClick={() => {
                      setOpenTopMenu('');
                      showToast(`${activeDateRange} 기간으로 전환했습니다.`);
                    }}
                    type="button"
                  >
                    적용
                  </button>
                </div>
              )}
            </div>
            <button className="icon-button alert" onClick={() => showToast('마감·의견 알림 12건을 통합 콘솔에 표시했습니다.')} type="button" aria-label="알림">
              <Bell size={18} />
              <span>12</span>
            </button>
            <button className="icon-button" onClick={() => setReportOpen(true)} type="button" aria-label="도움말">
              <MessageSquareText size={18} />
            </button>
            <div className="top-select-wrap user-select-wrap">
              <button className="profile profile-button" onClick={() => setOpenTopMenu(openTopMenu === 'user' ? '' : 'user')} type="button">
                <div className="avatar">{activeUserName.slice(0, 1)}</div>
                <div>
                  <strong>{activeUserName}</strong>
                  <span>{members.find((member) => member.name === activeUserName)?.role ?? '사용자'}</span>
                </div>
                <ChevronDown size={15} />
              </button>
              {openTopMenu === 'user' && (
                <div className="top-select-menu user-menu">
                  {members.map((member) => (
                    <button
                      className={activeUserName === member.name ? 'active' : ''}
                      key={member.name}
                      onClick={() => {
                        setActiveUserName(member.name);
                        setCommentDraft((draft) => ({ ...draft, member: member.name }));
                        setOpenTopMenu('');
                        showToast(`${member.name} 사용자로 전환했습니다.`);
                      }}
                      type="button"
                    >
                      <strong>{member.name}</strong>
                      <span>{member.role}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="action-row" aria-label="주요 작업">
          <div className={`sync-pill ${sharedSync.available ? 'online' : 'local'} ${sharedSync.status === 'saving' ? 'saving' : ''}`}>
            <span aria-hidden="true" />
            {sharedSync.message}
          </div>
          {activeNav === 'console' && (
            <button className="primary-action" onClick={handlePrimaryAction} type="button">
              <Plus size={17} />
              새 업무 등록
            </button>
          )}
          <button className="secondary-action" onClick={() => setReportOpen(true)} type="button">
            <Download size={17} />
            리포트 내보내기
          </button>
        </section>

        {activeNav === 'console' ? (
          <>
            <section className="metric-strip" aria-label="통합 상태">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <article className="metric" key={metric.label}>
                    <div className={`metric-icon ${metric.tone}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <span>{metric.label}</span>
                      <strong className={metric.tone}>{metric.value}건</strong>
                      <p>{metric.sub}</p>
                    </div>
                  </article>
                );
              })}
            </section>

            <section className="console-priority-grid">
              <WorkloadMatrixPanel
                title="주간 팀 업무량 총괄"
                subtitle={`${activeDateRange} · 각 탭의 세부 업무량을 합산한 담당자별 집중도입니다.`}
                data={consoleWorkloadData}
                onMemberClick={(name) => setFilters((state) => ({ ...state, owner: name }))}
              />

              <WeeklyOpsCalendar
                entries={calendarEntries}
                selectedProjectName={selectedProjectName}
                onOpenEntry={openCalendarEntry}
                onShowAll={() => selectProjectScope('전체 프로젝트')}
                setToast={showToast}
              />
            </section>

            <section className="main-grid">
              <div className="register-panel panel">
                <div className="panel-header">
                  <div>
                    <h2>통합 업무 레지스터</h2>
                    <p>과제·지원사업·특허·시험·성과 업무를 한곳에서 추적합니다.</p>
                  </div>
                  <div className="panel-header-actions">
                    <div className="segmented-control" aria-label="통합 업무 레지스터 보기 형식">
                      <button className={registerView === 'table' ? 'active' : ''} onClick={() => setRegisterView('table')} type="button">표</button>
                      <button className={registerView === 'calendar' ? 'active' : ''} onClick={() => setRegisterView('calendar')} type="button">달력</button>
                    </div>
                    <button className="icon-button" onClick={refreshRegister} type="button" aria-label="새로고침">
                      <RefreshCw size={16} />
                    </button>
                    <button
                      className="secondary-action compact-action"
                      onClick={() => exportCsv('통합업무레지스터.csv', workCsvColumns, workCsvRows(sortedFilteredItems))}
                      type="button"
                    >
                      <Download size={15} />
                      CSV
                    </button>
                  </div>
                </div>

                <div className="filters">
                  <label className="filter-input">
                    <Search size={16} />
                    <input
                      value={filters.query}
                      onChange={(event) => setFilters((state) => ({ ...state, query: event.target.value }))}
                      placeholder="업무명, 과제명, 담당자 검색"
                    />
                  </label>
                  <select value={filters.type} onChange={(event) => setFilters((state) => ({ ...state, type: event.target.value }))}>
                    <option>전체</option>
                    {Object.keys(typeColors).map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                  <select value={filters.stage} onChange={(event) => setFilters((state) => ({ ...state, stage: event.target.value }))}>
                    <option>전체 단계</option>
                    <option>계획</option>
                    <option>작성</option>
                    <option>수행</option>
                    <option>확인</option>
                    <option>의뢰</option>
                    <option>정산</option>
                    <option>진행</option>
                  </select>
                  <select value={filters.status} onChange={(event) => setFilters((state) => ({ ...state, status: event.target.value }))}>
                    <option>전체 상태</option>
                    {statusOptions.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                  <select value={filters.owner} onChange={(event) => setFilters((state) => ({ ...state, owner: event.target.value }))}>
                    <option>전체 담당자</option>
                    {members.map((member) => (
                      <option key={member.name}>{member.name}</option>
                    ))}
                  </select>
                  <button className="filter-button" onClick={() => resetFilters()} type="button">
                    <SlidersHorizontal size={16} />
                    초기화
                  </button>
                </div>

                {registerView === 'table' ? (
                  <div className="table-shell">
                    <table className="work-table">
                      <thead>
                        <tr>
                          <SortableHeader activeSort={registerSort} label="구분" onSort={toggleRegisterSort} sortKey="type" />
                          <SortableHeader activeSort={registerSort} label="과제/사업명" onSort={toggleRegisterSort} sortKey="project" />
                          <SortableHeader activeSort={registerSort} label="업무명" onSort={toggleRegisterSort} sortKey="task" />
                          <SortableHeader activeSort={registerSort} label="담당자" onSort={toggleRegisterSort} sortKey="owner" />
                          <SortableHeader activeSort={registerSort} label="단계" onSort={toggleRegisterSort} sortKey="stage" />
                          <SortableHeader activeSort={registerSort} label="상태" onSort={toggleRegisterSort} sortKey="status" />
                          <SortableHeader activeSort={registerSort} label="마감" onSort={toggleRegisterSort} sortKey="due" />
                          <SortableHeader activeSort={registerSort} label="필요 증빙" onSort={toggleRegisterSort} sortKey="evidenceNeed" />
                          <SortableHeader activeSort={registerSort} label="외부기관" onSort={toggleRegisterSort} sortKey="institution" />
                          <SortableHeader activeSort={registerSort} label="확인 상태" onSort={toggleRegisterSort} sortKey="risk" />
                          <SortableHeader activeSort={registerSort} label="최근 업데이트" onSort={toggleRegisterSort} sortKey="lastUpdate" />
                          <th>상세</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedFilteredItems.map((item) => (
                          <tr key={item.id} className={selectedId === item.id ? 'selected' : ''} onClick={() => chooseItem(item)}>
                            <td>
                              <span className={`type-chip ${typeColors[item.type]}`}>{item.type}</span>
                            </td>
                            <td className="strong-cell">{item.project}</td>
                            <td>{item.task}</td>
                            <td>{item.owner}</td>
                            <td>
                              <span className="stage-chip">{item.stage}</span>
                            </td>
                            <td>
                              <span className="stage-chip">{item.status}</span>
                            </td>
                            <td className={daysLeft(item.due) <= 5 ? 'deadline-soon' : ''}>{item.due.slice(5)}</td>
                            <td>{item.evidenceNeed}</td>
                            <td>{item.institution}</td>
                            <td>
                              <span className={`risk-dot ${riskClass[item.risk]}`}>{getRiskDisplay(item.risk)}</span>
                            </td>
                            <td>{item.lastUpdate}</td>
                            <td>
                              <button
                                className="detail-open-button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  openDetailModal(item);
                                }}
                                type="button"
                              >
                                상세
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <RegisterDeadlineCalendar
                    items={sortedFilteredItems}
                    dateRange={activeDateRange}
                    selectedId={selectedId}
                    chooseItem={openDetailModal}
                  />
                )}

                <div className="table-footer">
                  <span>{registerView === 'table' ? `총 ${sortedFilteredItems.length}건 표시` : `${activeDateRange} 마감 ${sortedFilteredItems.length}건`}</span>
                  <button onClick={() => setRegisterView(registerView === 'table' ? 'calendar' : 'table')} type="button">
                    {registerView === 'table' ? '달력으로 보기' : '표로 보기'}
                  </button>
                </div>
              </div>

              <UpcomingDeadlinePanel
                workItems={workItems}
                onOpenItem={openDetailModal}
                onShowAll={() => resetFilters('마감 업무 전체를 볼 수 있도록 필터를 초기화했습니다.')}
              />

              <aside className="detail-panel panel retired-detail-panel" aria-hidden="true">
                <div className="panel-header tight">
                  <div>
                    <h2>선택 업무 상세</h2>
                    <p>{detailDraft.id}</p>
                  </div>
                  <button className="icon-button" type="button" aria-label="상세 닫기">
                    <X size={16} />
                  </button>
                </div>

                <div className="detail-form">
                  <label>
                    업무명
                    <input value={detailDraft.task} onChange={(event) => updateDraft('task', event.target.value)} />
                  </label>
                  <label>
                    연결 과제
                    <div className="input-with-button">
                      <input value={detailDraft.project} onChange={(event) => updateDraft('project', event.target.value)} />
                      <button onClick={() => setDossierOpen(true)} type="button">과제 열기</button>
                    </div>
                  </label>

                  <div className="form-grid">
                    <label>
                      담당자
                      <select value={detailDraft.owner} onChange={(event) => updateDraft('owner', event.target.value)}>
                        {members.map((member) => (
                          <option key={member.name}>{member.name}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      단계
                      <select value={detailDraft.stage} onChange={(event) => updateDraft('stage', event.target.value)}>
                        <option>계획</option>
                        <option>작성</option>
                        <option>수행</option>
                        <option>확인</option>
                        <option>의뢰</option>
                        <option>정산</option>
                        <option>진행</option>
                        <option>종결</option>
                      </select>
                    </label>
                    <label>
                      마감일
                      <input type="date" value={detailDraft.due} onChange={(event) => updateDraft('due', event.target.value)} />
                    </label>
                    <label>
                      확인 상태
                      <select value={detailDraft.risk} onChange={(event) => updateDraft('risk', event.target.value)}>
                        <option value="낮음">안정</option>
                        <option value="중">관찰</option>
                        <option value="높음">확인 필요</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    업무 상태
                    <select value={detailDraft.status} onChange={(event) => updateDraft('status', event.target.value)}>
                      <option>계획</option>
                      <option>작성</option>
                      <option>진행 중</option>
                      <option>외부 협의</option>
                      <option>보완 필요</option>
                      <option>마감 대기</option>
                      <option>종결</option>
                    </select>
                  </label>

                  <label>
                    업무 내용 / 메모
                    <textarea value={detailDraft.memo} onChange={(event) => updateDraft('memo', event.target.value)} />
                  </label>

                  <div className="form-grid">
                    <label>
                      필요한 증빙
                      <input value={detailDraft.evidenceNeed} onChange={(event) => updateDraft('evidenceNeed', event.target.value)} />
                    </label>
                    <label>
                      외부기관
                      <input value={detailDraft.institution} onChange={(event) => updateDraft('institution', event.target.value)} />
                    </label>
                  </div>

                  <div className="form-grid">
                    <label>
                      막힌 항목
                      <input value={detailDraft.blocker} onChange={(event) => updateDraft('blocker', event.target.value)} />
                    </label>
                    <label>
                      다음 액션
                      <input value={detailDraft.nextAction} onChange={(event) => updateDraft('nextAction', event.target.value)} />
                    </label>
                  </div>

                  <div className="evidence-box">
                    <div className="section-label">
                      관련 증빙 파일
                      <button onClick={addEvidence} type="button">
                        <Upload size={14} />
                        추가
                      </button>
                    </div>
                    <div className="evidence-list">
                      {detailDraft.evidence.length ? (
                        detailDraft.evidence.map((file) => (
                          <span className="evidence-chip editable" key={file}>
                            <FileText size={14} />
                            {file}
                            <button onClick={() => removeEvidence(file)} type="button" aria-label={`${file} 삭제`}>
                              <X size={12} />
                            </button>
                          </span>
                        ))
                      ) : (
                        <p>등록된 증빙이 없습니다.</p>
                      )}
                    </div>
                  </div>

                  <div className="comment-box">
                    <div className="section-label">
                      담당자 의견
                      <span>{selectedComments.length}건</span>
                    </div>
                    <div className="comment-list">
                      {selectedComments.length ? (
                        selectedComments.map((comment) => (
                          <article key={comment.id}>
                            <div>
                              <strong>{comment.member}</strong>
                              <span>{comment.date}</span>
                              {comment.member === activeUserName && (
                                <button onClick={() => deleteWorkComment(comment)} type="button">삭제</button>
                              )}
                            </div>
                            <p>{comment.text}</p>
                          </article>
                        ))
                      ) : (
                        <p>등록된 의견이 없습니다.</p>
                      )}
                    </div>
                    <div className="comment-input-row">
                      <select value={commentDraft.member} onChange={(event) => setCommentDraft((draft) => ({ ...draft, member: event.target.value }))}>
                        {members
                          .filter((member) => member.name !== detailDraft.owner)
                          .map((member) => (
                            <option key={member.name}>{member.name}</option>
                          ))}
                      </select>
                      <input
                        value={commentDraft.text}
                        onChange={(event) => setCommentDraft((draft) => ({ ...draft, text: event.target.value }))}
                        placeholder="다른 담당자가 남길 의견 입력"
                      />
                      <button onClick={addWorkComment} type="button">의견 추가</button>
                    </div>
                  </div>

                  <div className="button-row">
                    <button className="danger-button" onClick={deleteSelectedItem} type="button">
                      삭제
                    </button>
                    <button className="secondary-action stretch" onClick={() => saveDraft('임시 저장했습니다.')} type="button">
                      임시저장
                    </button>
                    <button className="primary-action stretch" onClick={() => completeWorkItem(detailDraft)} type="button">
                      마감
                    </button>
                  </div>
                </div>
              </aside>
            </section>

            <section className="lower-grid retired-lower-grid" aria-hidden="true">
              <div className="panel deadline-panel">
                <div className="panel-header">
                  <div>
                    <h2>다가오는 마감</h2>
                    <p>7일 기준</p>
                  </div>
                  <button onClick={() => resetFilters('마감 업무 전체를 볼 수 있도록 필터를 초기화했습니다.')} type="button">전체 보기</button>
                </div>
                <div className="deadline-list">
                  {workItems
                    .slice()
                    .sort((a, b) => a.due.localeCompare(b.due))
                    .slice(0, 5)
                    .map((item) => (
                      <button key={item.id} onClick={() => chooseItem(item)} type="button">
                        <CalendarDays size={16} />
                        <span>
                          <b>{item.due.slice(5)}</b>
                          {item.task}
                        </span>
                        <strong>D-{Math.max(0, daysLeft(item.due))}</strong>
                      </button>
                    ))}
                </div>
              </div>

              <CompletedWorkPanel
                logs={completedWorkLogs}
                workItems={workItems}
                onOpenItem={chooseItem}
                onExportCsv={exportCsv}
                setToast={showToast}
              />
            </section>

            <ProjectCommandPanel
              summaries={projectSummaries}
              selectedProjectName={selectedProjectName}
              onSelectProject={selectProjectScope}
              onOpenDossier={openProjectDossier}
            />

            <DomainOperationsPanel
              items={workItems}
              selectedType={filters.type}
              selectedProjectName={selectedProjectName}
              onSelectDomain={selectDomainScope}
              onOpenDomainLedger={setDomainLedgerType}
            />

            <TeamResponsibilityPanel
              items={workItems}
              checkins={teamCheckins}
              comments={workComments}
              selectedProjectName={selectedProjectName}
              onSelectMember={selectMemberScope}
              onOpenMember={setSelectedMemberName}
              onOpenAllocationPlan={() => setAllocationOpen(true)}
            />

            <section className="lower-grid single-panel">
              <CompletedWorkPanel
                logs={completedWorkLogs}
                workItems={workItems}
                onOpenItem={openDetailModal}
                onExportCsv={exportCsv}
                setToast={showToast}
              />
            </section>
          </>
        ) : (
          <RenderErrorBoundary resetKey={activeNav}>
            <ModuleWorkspace
              activeNav={activeNav}
              config={activeConfig}
              workItems={workItems}
              workloadItems={operationalWorkloadItems}
              testInstitutions={testInstitutions}
              selectedTestInstitutionId={selectedTestInstitutionId}
              testInstitutionDraft={testInstitutionDraft}
              onSelectTestInstitution={selectTestInstitution}
              onUpdateTestInstitutionRow={updateTestInstitutionRow}
              onUpdateTestInstitutionDraft={updateTestInstitutionDraft}
              onSaveTestInstitution={saveTestInstitution}
              onAddTestInstitution={addTestInstitution}
              onDeleteTestInstitution={deleteTestInstitution}
              onDeleteTestInstitutions={deleteTestInstitutions}
              patents={patents}
              selectedPatentId={selectedPatentId}
              patentDraft={patentDraft}
              onSelectPatent={selectPatent}
              onUpdatePatentDraft={updatePatentDraft}
              onSavePatent={savePatent}
              onAddPatent={addPatent}
              onDeletePatents={deletePatents}
              budgetRows={budgetRows}
              budgetProjectFilter={budgetProjectFilter}
              budgetYearFilter={budgetYearFilter}
              selectedBudgetId={selectedBudgetId}
              budgetDraft={budgetDraft}
              onBudgetProjectFilterChange={setBudgetProjectFilter}
              onBudgetYearFilterChange={setBudgetYearFilter}
              onSelectBudgetRow={selectBudgetRow}
              onUpdateBudgetDraft={updateBudgetDraft}
              onSaveBudgetRow={saveBudgetRow}
              onAddBudgetRow={addBudgetRow}
              onDeleteBudgetRows={deleteBudgetRows}
              teamCheckins={teamCheckins}
              projectPortfolioItems={projectPortfolioItems}
              projectTargetRows={projectTargetRows}
              selectedPortfolioId={selectedPortfolioId}
              onSelectPortfolio={setSelectedPortfolioId}
              onUpdatePortfolioItem={updatePortfolioItem}
              onAddPortfolioProject={addProjectPortfolioItem}
              onDeletePortfolioProject={deleteProjectPortfolioItem}
              onDeletePortfolioProjects={deleteProjectPortfolioItems}
              onOpenPortfolioEdit={(projectId) => {
                setSelectedPortfolioId(projectId);
                setPortfolioEditOpen(true);
              }}
              executionPlans={executionPlans}
              selectedExecutionProjectId={selectedExecutionProjectId}
              onSelectExecutionProject={setSelectedExecutionProjectId}
              onUpdateExecutionMonth={updateExecutionMonth}
              onSaveSchedule={saveExecutionSchedule}
              onDeleteSchedule={deleteExecutionSchedule}
              onDeleteSchedules={deleteExecutionSchedules}
              onAddExecutionTask={addExecutionTask}
              onSaveWorkItem={saveWorkItem}
              equipmentItems={equipmentItems}
              selectedEquipmentId={selectedEquipmentId}
              onSelectEquipment={setSelectedEquipmentId}
              onUpdateEquipmentItem={updateEquipmentItem}
              onUpdateEquipmentQuote={updateEquipmentQuote}
              onUpdateEquipmentSpec={updateEquipmentSpec}
              onRenameEquipmentSpec={renameEquipmentSpec}
              onAddEquipmentSpec={addEquipmentSpec}
              onAddEquipment={addEquipmentItem}
              onDeleteEquipmentItems={deleteEquipmentItems}
              testRequestItems={testRequestItems}
              selectedTestRequestId={selectedTestRequestId}
              onSelectTestRequest={setSelectedTestRequestId}
              onUpdateTestRequest={updateTestRequest}
              onAddTestRequest={addTestRequest}
              onSaveTestRequest={saveTestRequest}
              onDeleteTestRequests={deleteTestRequests}
              royaltyRows={royaltyRowsState}
              onAddRoyaltyRow={addRoyaltyRow}
              onSaveRoyaltyRow={saveRoyaltyRow}
              onDeleteRoyaltyRows={deleteRoyaltyRows}
              labAdminRows={labAdminRowsState}
              onAddLabAdminRow={addLabAdminRow}
              onSaveLabAdminRow={saveLabAdminRow}
              onDeleteLabAdminRows={deleteLabAdminRows}
              checkinDraft={checkinDraft}
              updateCheckinDraft={updateCheckinDraft}
              submitTeamCheckin={submitTeamCheckin}
              advanceCheckinStatus={advanceCheckinStatus}
              selectedItem={selectedItem}
              sharedStorageConfig={sharedStorageConfig}
              activeUserName={activeUserName}
              chooseItem={chooseItem}
              onCompleteItem={completeWorkItem}
              onDeleteWorkItems={deleteWorkItems}
              onExportCsv={exportCsv}
              onOpenModuleInput={openModuleTaskInput}
              setFilters={setFilters}
              setToast={showToast}
              onOpenMember={setSelectedMemberName}
            />
          </RenderErrorBoundary>
        )}
      </main>

      {isDetailModalOpen && (
        <WorkDetailModal
          detailDraft={detailDraft}
          members={members}
          selectedComments={selectedComments}
          activeUserName={activeUserName}
          commentDraft={commentDraft}
          onClose={() => setDetailModalOpen(false)}
          onUpdateDraft={updateDraft}
          onOpenDossier={() => setDossierOpen(true)}
          onAddEvidence={addEvidence}
          onRemoveEvidence={removeEvidence}
          onDeleteComment={deleteWorkComment}
          onUpdateCommentDraft={setCommentDraft}
          onAddComment={addWorkComment}
          onDelete={() => {
            deleteSelectedItem();
            setDetailModalOpen(false);
          }}
          onSave={saveDraft}
          onComplete={completeWorkItem}
        />
      )}

      {isPortfolioEditOpen && (
        <PortfolioEditModal
          project={projectPortfolioItems.find((item) => item.id === selectedPortfolioId) ?? projectPortfolioItems[0]}
          targets={projectTargetRows.filter((row) => row.projectId === selectedPortfolioId)}
          onClose={() => setPortfolioEditOpen(false)}
          onSave={savePortfolioProject}
        />
      )}

      {isNewOpen && (
        <div className="modal-backdrop" role="presentation">
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="new-task-title">
            <div className="modal-header">
              <div>
                <h2 id="new-task-title">{newTaskContext === 'console' ? '새 업무 등록' : `${activeConfig?.title ?? '업무'} 입력`}</h2>
                <p>선택한 탭의 업무 목록에 표시될 항목을 입력하고 담당자를 지정합니다.</p>
              </div>
              <button className="icon-button" onClick={() => setNewOpen(false)} type="button" aria-label="닫기">
                <X size={18} />
              </button>
            </div>
            <div className="detail-form">
              {!isAssetTaskModal && (
                <>
                  <label>
                    구분
                    <select
                      value={newTask.type}
                      onChange={(event) => {
                        const nextType = event.target.value;
                        setNewTask((task) => ({
                          ...task,
                          type: nextType,
                          workCategory: getDefaultWorkCategory(newTaskContext, nextType),
                        }));
                      }}
                    >
                      {newTaskTypeOptions.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    과제/사업명
                    <input value={newTask.project} onChange={(event) => setNewTask((task) => ({ ...task, project: event.target.value }))} placeholder="예: 2026 소재부품 기술개발" />
                  </label>
                </>
              )}
              <div className="form-field-block">
                <span>업무범주</span>
                <div className="category-toggle-grid" role="group" aria-label="업무범주 선택">
                  {newTaskCategoryOptions.map((category) => (
                    <button
                      className={newTask.workCategory === category ? 'active' : ''}
                      key={category}
                      onClick={() => setNewTask((task) => ({ ...task, workCategory: category }))}
                      type="button"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <label>
                업무명
                <input value={newTask.task} onChange={(event) => setNewTask((task) => ({ ...task, task: event.target.value }))} placeholder="예: 1차년도 계획서 보완" />
              </label>
              <div className="form-grid">
                <label>
                  담당자
                  <select value={newTask.owner} onChange={(event) => setNewTask((task) => ({ ...task, owner: event.target.value }))}>
                    {members.map((member) => (
                      <option key={member.name}>{member.name}</option>
                    ))}
                  </select>
                </label>
                {isAssetTaskModal ? (
                  <label>
                    상태
                    <select value={newTask.status} onChange={(event) => setNewTask((task) => ({ ...task, status: event.target.value }))}>
                      {statusOptions.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <label>
                    마감일
                    <input type="date" value={newTask.due} onChange={(event) => setNewTask((task) => ({ ...task, due: event.target.value }))} />
                  </label>
                )}
              </div>
              {isAssetTaskModal && (
                <>
                  <div className="form-grid">
                    <label>
                      마감일
                      <input type="date" value={newTask.due} onChange={(event) => setNewTask((task) => ({ ...task, due: event.target.value }))} />
                    </label>
                    <label>
                      필요 증빙
                      <input value={newTask.evidenceNeed} onChange={(event) => setNewTask((task) => ({ ...task, evidenceNeed: event.target.value }))} placeholder="예: 발표자료 초안" />
                    </label>
                    <label>
                      외부기관
                      <input value={newTask.institution} onChange={(event) => setNewTask((task) => ({ ...task, institution: event.target.value }))} placeholder="예: 전문기관, 공동기관" />
                    </label>
                  </div>
                </>
              )}
            </div>
            <div className="button-row modal-actions">
              <button className="secondary-action stretch" onClick={() => setNewOpen(false)} type="button">취소</button>
              <button className="primary-action stretch" onClick={createTask} type="button">등록</button>
            </div>
          </section>
        </div>
      )}

      {isReportOpen && (
        <ReportModal
          kind={reportKind}
          setKind={setReportKind}
          draft={reportDraft}
          onClose={() => setReportOpen(false)}
          setToast={showToast}
        />
      )}

      {isDossierOpen && (
        <ProjectDossierModal
          item={selectedItem}
          relatedItems={relatedProjectItems}
          executionPlans={executionPlans}
          onClose={() => setDossierOpen(false)}
          chooseItem={(item) => {
            setDossierOpen(false);
            openDetailModal(item);
          }}
          setToast={showToast}
        />
      )}

      {domainLedgerType && (
        <DomainLedgerModal
          type={domainLedgerType}
          items={workItems}
          selectedProjectName={selectedProjectName}
          onClose={() => setDomainLedgerType('')}
          onSelectDomain={(type) => {
            selectDomainScope(type);
            setDomainLedgerType('');
          }}
          onOpenItem={(item) => {
            setDomainLedgerType('');
            openDetailModal(item);
          }}
        />
      )}

      {isAllocationOpen && (
        <WorkAllocationModal
          items={workItems}
          selectedProjectName={selectedProjectName}
          onClose={() => setAllocationOpen(false)}
          onOpenItem={(item) => {
            setAllocationOpen(false);
            openDetailModal(item);
          }}
          onSelectMember={(memberName) => {
            selectMemberScope(memberName);
            setAllocationOpen(false);
          }}
        />
      )}

      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          items={workItems}
          checkins={teamCheckins}
          requests={externalRequests}
          documents={evidenceVault}
          onClose={() => setSelectedMemberName('')}
          chooseItem={(item) => {
            setSelectedMemberName('');
            openDetailModal(item);
          }}
          setToast={showToast}
          advanceCheckinStatus={advanceCheckinStatus}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
