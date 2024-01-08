import { ArrowLeft, ArrowRight } from 'lucide-react'
import { DOTS, usePagination } from '../hook/usePagination'

interface PaginationProps {
  onPageChange: (page: number) => void
  totalCount: number
  currentPage: number
  pageSize: number
  siblingCount?: number
}

export default function Pagination({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
  siblingCount = 1,
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (paginationRange === undefined) return null

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null
  }

  function onNext() {
    onPageChange(currentPage + 1)
  }
  function onPrev() {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange![paginationRange!.length - 1]

  return (
    <div className="mb-8 mt-6 flex w-2/3 items-center justify-center gap-2">
      <button
        className="cursor-pointer rounded-sm bg-[#ff5350] disabled:cursor-default disabled:bg-slate-400"
        type="button"
        disabled={currentPage === 1}
        onClick={onPrev}
      >
        <ArrowLeft color="white" />
      </button>
      <div>
        <div className="flex gap-1">
          {paginationRange?.map((page, idx) => {
            if (page === DOTS) {
              return (
                <div
                  key={'dots_' + idx}
                  className="h-7 w-7 rounded-sm bg-white text-center shadow-md"
                >
                  &#8230;
                </div>
              )
            }

            return (
              <button
                type="button"
                onClick={() => onPageChange(+page)}
                key={page}
                className="h-7 w-7 rounded-sm bg-white text-center shadow-md"
                style={
                  page === currentPage
                    ? { backgroundColor: '#ff5350', color: '#ffffff' }
                    : {}
                }
              >
                {page}
              </button>
            )
          })}
        </div>
      </div>
      <button
        className="rounded-sm bg-[#ff5350] disabled:cursor-default disabled:bg-slate-400"
        type="button"
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <ArrowRight color="white" />
      </button>
    </div>
  )
}
