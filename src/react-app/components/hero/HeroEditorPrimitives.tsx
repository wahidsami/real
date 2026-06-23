import React from 'react';

export function AccordionShell({
  title,
  subtitle,
  children,
  open,
  onToggle,
  dragHandle,
  badge,
  actions,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  open?: boolean;
  onToggle?: () => void;
  dragHandle?: React.ReactNode;
  badge?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="accordion-shell">
      <div role="button" onClick={onToggle} className="flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-3">
          {dragHandle}
          <div>
            <div className="font-black">{title}</div>
            {subtitle ? <div className="text-sm text-slate-400">{subtitle}</div> : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge ? <div className="text-xs">{badge}</div> : null}
          {actions}
        </div>
      </div>
      {open ? <div className="mt-2">{children}</div> : null}
    </div>
  );
}

export function SectionLabel({ titleAr, titleEn, language }: { titleAr: string; titleEn: string; language: string }) {
  return <h4 className="text-sm font-black">{language === 'ar' ? titleAr : titleEn}</h4>;
}

export function SettingRow({ labelAr, labelEn, language, children }: { labelAr: string; labelEn: string; language: string; children: React.ReactNode }) {
  return (
    <div className="setting-row">
      <label className="block text-xs font-semibold mb-1">{language === 'ar' ? labelAr : labelEn}</label>
      <div>{children}</div>
    </div>
  );
}

export function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <div className="toggle-row flex items-center justify-between">
      <div className="text-sm">{label}</div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}

export function FieldLabel({ labelAr, labelEn, language, children }: { labelAr?: string; labelEn?: string; language?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      {labelAr && labelEn && language && (
        <span className="block text-xs font-semibold mb-1.5 text-slate-400">{language === 'ar' ? labelAr : labelEn}</span>
      )}
      <div className="field-content">{children}</div>
    </label>
  );
}

export default {};
