import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
  category: 'download' | 'offers' | 'android' | 'ios';
  badge?: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  allowMultiple?: boolean;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  allowMultiple = false
}) => {
  // Store set of open indices
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices(prev => (prev.includes(index) ? [] : [index]));
    }
  };

  const handleExpandAll = () => {
    setOpenIndices(items.map((_, i) => i));
  };

  const handleCollapseAll = () => {
    setOpenIndices([]);
  };

  return (
    <div className="space-y-4">
      {/* Quick Actions Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" />
          <span>{items.length} Questions Answered</span>
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExpandAll}
            className="hover:text-white transition-colors"
          >
            Expand all
          </button>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="hover:text-white transition-colors"
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3" role="region" aria-label="Frequently Asked Questions">
        {items.map((item, index) => {
          const isOpen = openIndices.includes(index);
          const controlId = `faq-answer-${index}`;
          const buttonId = `faq-question-${index}`;

          return (
            <div
              key={item.question}
              className={`rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                isOpen
                  ? 'glass-card border-[#7C5CFF]/35 bg-[#151C28]/95 shadow-lg shadow-[#7C5CFF]/10'
                  : 'glass-card border-white/5 bg-[#111722]/80 hover:border-white/15 hover:bg-[#151C28]/70'
              }`}
            >
              <button
                id={buttonId}
                type="button"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-controls={controlId}
                className="group flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
              >
                <div className="flex items-center gap-3 pr-4">
                  <span className={`transition-colors duration-200 ${isOpen ? 'text-[#A78BFA]' : 'text-slate-200 group-hover:text-white'}`}>
                    {item.question}
                  </span>
                  {item.badge && (
                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-[#A78BFA] bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                      ? 'border-[#7C5CFF]/40 bg-[#7C5CFF]/20 text-[#A78BFA] rotate-180'
                      : 'border-white/10 bg-white/5 text-slate-400 group-hover:border-white/20 group-hover:text-slate-200 group-hover:bg-white/10'
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {/* Smooth Grid-Template-Rows Expand / Collapse Transition */}
              <div
                id={controlId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-2 text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    <p className="max-w-3xl">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
