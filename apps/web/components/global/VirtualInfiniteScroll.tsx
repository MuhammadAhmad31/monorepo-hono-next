"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, type ReactNode } from "react";

interface VirtualItem {
  index: number;
  size: number;
  start: number;
}

interface VirtualInfiniteScrollProps<T> {
  items: T[];
  height?: number | string;
  estimatedItemHeight?: number;
  overscan?: number;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  gap?: number;
  hasMore?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
  loadMoreThreshold?: number;
  renderLoader?: () => ReactNode;
}

/**
 * Virtual Infinite Scroll Component
 * Automatically loads more data when scrolling near bottom
 */
export const VirtualInfiniteScroll = <T,>({
  items,
  height = '600px',
  estimatedItemHeight = 100,
  overscan = 10,
  renderItem,
  className = '',
  gap = 0,
  hasMore = false,
  isLoading = false,
  onLoadMore,
  loadMoreThreshold = 500,
  renderLoader,
}: VirtualInfiniteScrollProps<T>) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedItemHeight,
    overscan,

  });

  const handleScroll = () => {
    if (!parentRef.current || !hasMore || isLoading || !onLoadMore) return;

    const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    if (distanceFromBottom < loadMoreThreshold) {
      onLoadMore();
    }
  };

  return (
    <div
      ref={parentRef}
      className={`overflow-auto ${className}`}
      style={{ height }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index] as T;

          return (
            <div
              key={virtualItem.index}
              className="absolute top-0 left-0 w-full"
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
                paddingBottom: gap,
              }}
            >
              {renderItem(item, virtualItem.index)}
            </div>
          );
        })}

        {isLoading && (
          <div
            className="absolute left-0 w-full flex justify-center py-4"
            style={{
              transform: `translateY(${virtualizer.getTotalSize()}px)`,
            }}
          >
            {renderLoader ? (
              renderLoader()
            ) : (
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span>Loading more...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}