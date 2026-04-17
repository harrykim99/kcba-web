"use client";

import { FileText, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export interface MeetingRecord {
  date: string;
  title: string;
  originalLink: string;
  content: string; // 남겨두지만 프론트에서는 더 이상 화면에 출력하는 용도로 쓰지 않음
}

interface MeetingCardProps {
  record: MeetingRecord;
  defaultOpen?: boolean;
}

export default function MeetingCard({ record, defaultOpen = false }: MeetingCardProps) {
  // 이제 모든 파일이 구글 앱스 스크립트에서 자동 PDF로 변환되어 넘어옵니다.
  const previewLink = record.originalLink.replace('/view', '/preview');

  // 긴 파일명(.docx, .pdf 등) 제거하여 깔끔하게 표시
  const displayTitle = record.title ? record.title.replace(/\.(pdf|docx|doc|xlsx|xls|pptx|ppt)$/i, '') : '제목 없음';

  return (
    <details open={defaultOpen} className="group bg-white rounded-xl shadow-sm border border-gray-200 mb-4 overflow-hidden flex flex-col transition-all">
      <summary 
        className="w-full p-4 hover:bg-gray-50 flex items-start gap-4 transition-colors cursor-pointer list-none group-open:border-b group-open:border-gray-100 group-open:bg-gray-50"
      >
        <div className="bg-[#002664]/10 p-2.5 rounded-lg flex-shrink-0 mt-0.5">
          <FileText className="w-5 h-5 text-[#002664]" />
        </div>
        <div className="flex-1 min-w-0 pr-2 flex flex-col justify-center">
          <span className="text-[11px] font-bold text-[#002664] tracking-wider">
            {record.date || '날짜 미상'}
          </span>
          <span className="font-bold text-gray-900 mt-0.5 leading-snug break-words text-base line-clamp-2 block group-open:line-clamp-none">
            {displayTitle}
          </span>
        </div>
        <div className="flex-shrink-0 pt-2 text-gray-400">
          <ChevronDown className="w-5 h-5 group-open:hidden" />
          <ChevronUp className="w-5 h-5 text-[#002664] hidden group-open:block" />
        </div>
      </summary>

      {/* 펼쳐졌을 때 콘텐츠 내용 (모든 문서는 서버 단에서 PDF 처리되었으므로 항상 iFrame 보여줌) */}
      <div className="bg-[#fcfcfd]">
        <div className="flex flex-col">
          <div className="bg-blue-50 border-b border-blue-100 p-3 px-4 flex items-center justify-between">
            <span className="text-xs text-blue-800 font-medium leading-tight">
              💡 줌/스크롤이 버벅거리나요?<br/>네이티브 브라우저로 쾌적하게 여세요!
            </span>
            <a 
              href={record.originalLink} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              부드러운 원본 뷰어
            </a>
          </div>
          <div className="w-full bg-gray-100 relative" style={{ height: '60vh', minHeight: '400px' }}>
            <iframe 
              src={previewLink} 
              className="absolute inset-0 w-full h-full border-0"
              title={record.title}
              allow="autoplay"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* 하단 컨트롤 바 */}
        <div className="p-3 bg-white flex justify-end items-center px-4 border-t border-gray-200">
          <a 
            href={record.originalLink} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#002664] hover:bg-[#002664]/10 px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            새 창에서 보기
          </a>
        </div>
      </div>
    </details>
  );
}
