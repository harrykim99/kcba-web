"use client";

import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, FileSearch, X, ExternalLink } from 'lucide-react';

export interface MeetingRecord {
  date: string;
  title: string;
  originalLink: string;
  content: string;
}

interface MeetingCardProps {
  record: MeetingRecord;
  defaultOpen?: boolean;
}

export default function MeetingCard({ record, defaultOpen = false }: MeetingCardProps) {
  const previewLink = record.originalLink.replace('/view', '/preview');
  const cleanContent = record.content ? record.content.replace(/\n\s*\n/g, '\n\n') : '추출된 텍스트가 없습니다.';

  // 긴 파일명(.docx, .pdf 등) 제거하여 깔끔하게 표시
  // 뷰어 모드 토글 상태 추가
  const [useOriginalViewer, setUseOriginalViewer] = useState(false);
  const isPdf = record.title && record.title.toLowerCase().includes('.pdf');
  
  // 긴 파일명(.docx, .pdf 등) 제거하여 깔끔하게 표시
  const displayTitle = record.title ? record.title.replace(/\.(pdf|docx|doc)$/i, '') : '제목 없음';

  // 기본적으로 PDF는 원본 뷰어, 나머지는 모바일 텍스트 뷰어 사용
  const showIframe = isPdf || useOriginalViewer;

  return (
    <details open={defaultOpen} className="group bg-white rounded-xl shadow-sm border border-gray-200 mb-4 overflow-hidden flex flex-col transition-all">
      {/* 카드 헤더 생략하고 기존 코드 유지 */}
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

      {/* 펼쳐졌을 때 콘텐츠 내용 */}
      <div className="bg-[#fcfcfd]">
        {showIframe ? (
          <div className="flex flex-col">
            <div className="bg-blue-50 border-b border-blue-100 p-3 px-4 flex items-center justify-between">
              <span className="text-xs text-blue-800 font-medium leading-tight">
                💡 줌/스크롤이 버벅거리나요?<br/>네이티브 앱으로 열어보세요!
              </span>
              <a 
                href={record.originalLink} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                부드러운 전용 뷰어
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
        ) : (
          <div className="p-8 flex flex-col items-center justify-center bg-gray-50 text-center border-b border-gray-100">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <FileText className="w-8 h-8 text-[#002664]" />
            </div>
            <h3 className="text-gray-900 font-bold mb-2">복잡한 양식이 포함된 문서입니다</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-6 max-w-[280px]">
              카카오톡 화면에서는 손가락 줌(확대)이 제한될 수 있습니다.<br/><br/>
              <b>가장 완벽한 화질과 보존된 서식(확대 지원)으로 보시려면 아래 전용 버튼으로 열어주세요.</b>
            </p>
            <a 
              href={record.originalLink} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#002664] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-[#001b47] active:scale-[0.98] transition-all w-full justify-center mb-3"
            >
              <ExternalLink className="w-4 h-4" />
              스마트 브라우저로 열기 (권장)
            </a>
            
            <p className="text-xs text-gray-400 font-medium">
              ※ 클릭 시 구글 드라이브 앱 또는 크롬/사파리가 열립니다.
            </p>
          </div>
        )}

        {/* 하단 컨트롤 바 */}
        <div className="p-3 bg-white flex justify-between items-center px-4 border-t border-gray-200">
          {showIframe && (
            <a 
              href={record.originalLink} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#002664] hover:bg-[#002664]/10 px-3 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              새 창 열기
            </a>
          )}
          
          {showIframe && !isPdf && (
            <button
              onClick={(e) => { e.preventDefault(); setUseOriginalViewer(false); }}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 shadow-sm bg-white text-gray-600 hover:text-gray-900 transition-colors ml-auto"
            >
              안내 화면으로 돌아가기
            </button>
          )}

          {isPdf && (
            <details className="group/text">
              <summary className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 shadow-sm bg-white text-gray-600 hover:text-gray-900 transition-colors cursor-pointer list-none group-open/text:bg-gray-100 group-open/text:text-gray-800">
                <FileSearch className="w-4 h-4" />
                <span className="group-open/text:hidden">숨겨진 텍스트 보기</span>
                <span className="hidden group-open/text:block">텍스트 닫기</span>
              </summary>
              <div className="relative border-t border-gray-100 bg-[#fbfcfd] p-5 mt-3">
                <div className="whitespace-pre-wrap text-[13px] text-gray-700 leading-relaxed font-mono">
                  {cleanContent}
                </div>
              </div>
            </details>
          )}
        </div>
      </div>
    </details>
  );
}
