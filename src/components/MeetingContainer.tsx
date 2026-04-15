"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FileText, ChevronLeft, Calendar } from 'lucide-react';
import MeetingCard, { MeetingRecord } from './MeetingCard';

interface MeetingContainerProps {
  records: MeetingRecord[];
}

export default function MeetingContainer({ records }: MeetingContainerProps) {
  // 전체 목록 뷰 (리스트 아이템만 나열, 클릭 시 바로 PDF 뷰어로 이동)
  return (
    <div className="flex flex-col gap-3 animate-in fade-in duration-300">
      <div className="mb-2 bg-[#002664]/5 inline-block px-4 py-2 rounded-full w-fit">
        <span className="text-sm font-semibold text-[#002664]">총 {records.length}건의 자료</span>
      </div>
      
      {records.map((record, index) => {
        const displayTitle = record.title ? record.title.replace(/\.(pdf|docx|doc)$/i, '') : '제목 없음';
        const previewLink = record.originalLink ? record.originalLink.replace('/view', '/preview') : '#';
        
        return (
          <a
            key={index}
            href={previewLink}
            target="_blank"
            rel="noreferrer"
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4 hover:shadow-md cursor-pointer active:scale-[0.99] transition-all block"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="bg-[#002664]/10 p-3 rounded-xl flex-shrink-0 group-hover:bg-[#002664]/20 transition-colors">
              <FileText className="w-6 h-6 text-[#002664]" />
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5" />
                {record.date || '날짜 미상'}
              </div>
              <span className="font-bold text-gray-900 leading-snug break-words text-[15px] line-clamp-2 block group-hover:text-[#002664] transition-colors">
                {displayTitle}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
