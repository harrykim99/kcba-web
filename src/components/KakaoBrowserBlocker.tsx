"use client";

import { useEffect, useState } from 'react';
import { MoreHorizontal, Globe, Smartphone } from 'lucide-react';

export default function KakaoBrowserBlocker() {
  const [isKakao, setIsKakao] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('kakaotalk')) {
      setIsKakao(true);
      location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(location.href);
    }
  }, []);

  if (!isKakao) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#002664] text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="bg-white/10 p-5 rounded-3xl mb-6 shadow-xl backdrop-blur-sm border border-white/20">
        <Smartphone className="w-16 h-16 text-white mb-2 mx-auto" />
      </div>
      
      <h1 className="text-2xl font-bold mb-4 tracking-tight">앗! 카카오톡으로 여셨네요</h1>
      
      <p className="text-[15px] text-blue-100 leading-relaxed mb-8 max-w-[280px]">
        카카오톡 화면에서는 시스템 <b>홈 화면 아이콘 설치</b>와 <b>문서 확대가 불가능</b>합니다.<br/><br/>
        완벽하게 시스템을 이용하시려면 <br/>
        아래 안내를 따라 <b>기본 브라우저</b>로 열어주세요.
      </p>

      <div className="bg-white text-[#002664] w-full max-w-[320px] rounded-2xl p-6 shadow-2xl relative">
        <h2 className="text-base font-bold mb-5 flex items-center justify-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          이렇게 해결하세요!
        </h2>
        
        <ol className="text-left space-y-4 text-[14px] font-medium">
          <li className="flex items-start gap-3">
            <span className="bg-[#002664] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">1</span>
            <span>화면 우측 하단의 <br/><b>[ ⋮ ] 버튼 (메뉴)</b>을 누릅니다.</span>
            <MoreHorizontal className="w-5 h-5 text-gray-400 mt-0.5 ml-auto" />
          </li>
          <li className="flex items-center gap-3">
            <span className="bg-[#002664] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">2</span>
            <span><b>'다른 브라우저로 열기'</b> 선택</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="bg-[#002664] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">3</span>
            <span className="text-gray-500">완벽한 화면에서 홈 화면 추가!</span>
          </li>
        </ol>
      </div>

      {/* 강제 화살표 느낌의 애니메이션 바텀 */}
      <div className="absolute bottom-10 animate-bounce flex flex-col items-center">
        <span className="text-xs text-white/70 mb-2 font-bold tracking-widest">하단 아이콘을 찾아주세요</span>
        <div className="w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
          <MoreHorizontal className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
