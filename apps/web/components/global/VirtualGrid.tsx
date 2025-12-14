"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useMemo, type ReactNode } from "react";

/**
 * Virtual Grid Component
 * Use for grid layouts: photo gallery, product cards, etc.
 */

interface VirtualGridProps<T> {
  items: T[];
  height?: number | string;
  columns?: number;
  estimatedItemHeight?: number;
  overscan?: number;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  gap?: number;
}

export const VirtualGrid = <T,>({
  items,
  height = '600px',
  columns = 3,
  estimatedItemHeight = 200,
  overscan = 5,
  renderItem,
  className = '',
  gap = 16,
}: VirtualGridProps<T>) => {
  const parentRef = useRef<HTMLDivElement>(null);

  // Group items into rows with proper typing
  const rows = useMemo<T[][]>(() => {
    const result: T[][] = [];
    for (let i = 0; i < items.length; i += columns) {
      result.push(items.slice(i, i + columns));
    }
    return result;
  }, [items, columns]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedItemHeight,
    overscan,
  });

  return (
    <div
      ref={parentRef}
      className={`overflow-auto ${className}`}
      style={{ height }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const rowItems = rows[virtualRow.index];

          return (
            <div
              key={virtualRow.index}
              className="absolute top-0 left-0 w-full"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                paddingBottom: gap,
              }}
            >
              <div
                className="grid h-full"
                style={{
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gap: `${gap}px`,
                }}
              >
                {rowItems?.map((item: T, colIndex: number) => (
                  <div key={virtualRow.index * columns + colIndex}>
                    {renderItem(item, virtualRow.index * columns + colIndex)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}