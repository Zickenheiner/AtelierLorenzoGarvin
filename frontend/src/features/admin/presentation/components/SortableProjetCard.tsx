import { cn } from '@/core/utils/cn';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { ReactNode } from 'react';

export function SortableProjetCard({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn('relative', isDragging && 'z-10 opacity-70')}
    >
      <button
        type="button"
        aria-label="Déplacer le projet"
        className="absolute left-2 top-2 z-10 flex h-8 w-8 cursor-grab items-center justify-center rounded-md bg-[var(--lga-surface)]/80 text-[var(--lga-muted)] backdrop-blur active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" strokeWidth={1.5} />
      </button>
      {children}
    </div>
  );
}
