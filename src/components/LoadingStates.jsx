/**
 * Suspense fallback loaders for better UX
 */

export function SectionLoader() {
  return (
    <div className="w-full space-y-6 px-6 py-20 sm:px-8 lg:px-10">
      <div className="h-12 w-32 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-800" />
      <div className="space-y-3">
        <div className="h-4 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-800" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-800" />
        <div className="h-4 w-4/6 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-800" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded bg-gradient-to-br from-slate-700 to-slate-800" />
        ))}
      </div>
    </div>
  )
}

export function CardLoader() {
  return (
    <div className="space-y-2 rounded-lg border border-[rgba(59,130,246,0.18)] bg-[rgba(10,25,47,0.5)] p-4 backdrop-blur-sm">
      <div className="h-6 w-3/4 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-800" />
      <div className="h-4 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-800" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-800" />
    </div>
  )
}

export function ImageLoader() {
  return (
    <div className="aspect-video w-full animate-pulse rounded-lg bg-gradient-to-br from-slate-700 to-slate-800" />
  )
}

export function SkeletonText({ lines = 3, width = 'w-full' }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-800 ${
            i === lines - 1 ? 'w-4/5' : width
          }`}
        />
      ))}
    </div>
  )
}

export function ComponentLoader() {
  return (
    <div className="w-full animate-pulse space-y-4 px-6 py-10 sm:px-8">
      <div className="h-10 w-40 rounded bg-gradient-to-r from-slate-700 to-slate-800" />
      <SkeletonText lines={4} />
    </div>
  )
}
