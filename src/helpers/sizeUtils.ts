export const SIZE_MAPPING = {
  'XS': 'X-Small',
  'S': 'Small', 
  'M': 'Medium',
  'L': 'Large',
  'XL': 'X-Large'
} as const;

export const getSizeDisplayName = (size: string): string => {
  if (!size) return 'Unknown';
  
  const upperSize = size.toUpperCase();
  return SIZE_MAPPING[upperSize as keyof typeof SIZE_MAPPING] || size;
};
