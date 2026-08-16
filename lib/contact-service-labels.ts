import type { ContactFormData } from '@/lib/validation/contact';

export const visitorServiceOptions = [
  {
    value: 'ai-jumpstart' as const,
    label: 'Workflow Assessment — $1,500 · seven business days · one workflow',
  },
  {
    value: 'not-sure' as const,
    label: 'Not sure — start with the stuck workflow',
  },
];

function visitorLabel(value: 'ai-jumpstart' | 'not-sure'): string {
  const option = visitorServiceOptions.find((item) => item.value === value);
  if (!option) {
    throw new Error(`Missing visitor service label for ${value}`);
  }
  return option.label;
}

export const serviceLabels: Record<ContactFormData['service'], string> = {
  'ai-jumpstart': visitorLabel('ai-jumpstart'),
  'custom-ai-build': 'Custom AI Build — scoped implementation',
  'not-sure': visitorLabel('not-sure'),
};
