import MeetingCard, { MeetingRecord } from '@/components/MeetingCard';
import MeetingContainer from '@/components/MeetingContainer';
import { AlertCircle } from 'lucide-react';
import { Suspense } from 'react';

// Next.js 캐싱 비활성화 (항상 최신 데이터를 긁어오도록 설정)
export const revalidate = 0;

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_GAS_API_URL;

  if (!apiUrl || apiUrl.includes('여기에_주소를_넣으세요')) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">API 주소가 설정되지 않았습니다.</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p><code>.env.local</code> 파일을 열어 <code>NEXT_PUBLIC_GAS_API_URL</code> 값을 구글 앱스 스크립트 배포 주소로 변경해주세요.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  try {
    // API 호출 (가상 캐시버스팅 쿼리 추가하여 완벽한 노캐싱 보장)
    const res = await fetch(`${apiUrl}?timestamp=${new Date().getTime()}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`API 응답 오류: ${res.status}`);
    }

    const records: MeetingRecord[] = await res.json();

    if (!records || records.length === 0) {
      return (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium">등록된 회의 자료가 없습니다.</p>
          <p className="text-sm text-gray-400 mt-2">구글 시트에서 새로운 회의 자료를 동기화해주세요.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2 relative">
        <Suspense fallback={<div className="p-10 text-center text-gray-500">로딩 중...</div>}>
          <MeetingContainer records={records} />
        </Suspense>
      </div>
    );

  } catch (error) {
    console.error('Fetch error:', error);
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        <h3 className="text-sm font-medium text-red-800">데이터를 불러오는 중 오류가 발생했습니다.</h3>
        <p className="mt-1 text-sm text-red-700">구글 배포 링크가 올바른지, 접근 권한이 "모든 사용자(Anyone)"로 되어 있는지 확인해주세요.</p>
      </div>
    );
  }
}
