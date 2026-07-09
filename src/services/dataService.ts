import type { Village } from '@/types';
import { getDataUrl } from '@/config';

// ============================================================
//  DATA SERVICE
//  All data fetching goes through this service layer.
//  Replace with API calls when backend is available.
// ============================================================

/**
 * Fetches and validates village data from the JSON file.
 * Throws a descriptive error if the data is missing or malformed.
 */
export async function fetchVillages(): Promise<Village[]> {
  const url = getDataUrl();

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      `Không thể kết nối đến dữ liệu. Vui lòng kiểm tra tệp ${url} tồn tại.`
    );
  }

  if (!response.ok) {
    throw new Error(
      `Tải dữ liệu thất bại (HTTP ${response.status}). ` +
      `Kiểm tra tệp ${url} có tồn tại và hợp lệ.`
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error(
      'Tệp dữ liệu JSON không hợp lệ. Vui lòng kiểm tra định dạng JSON.'
    );
  }

  if (!Array.isArray(data)) {
    throw new Error(
      'Định dạng dữ liệu không đúng. Tệp JSON phải là một mảng (array).'
    );
  }

  // Validate & sanitize each village record
  return data.map((item: unknown, index: number) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error(`Bản ghi thôn số ${index + 1} không hợp lệ.`);
    }
    const raw = item as Record<string, unknown>;

    // Required field validation
    if (typeof raw.id !== 'number')
      throw new Error(`Thôn số ${index + 1}: Trường "id" phải là số.`);
    if (typeof raw.name !== 'string' || !raw.name)
      throw new Error(`Thôn số ${index + 1}: Trường "name" bắt buộc.`);

    return {
      id: raw.id as number,
      name: (raw.name as string) || `Thôn ${index + 1}`,
      image: typeof raw.image === 'string' ? raw.image : '',
      area: typeof raw.area === 'string' ? raw.area : 'N/A',
      partyMembers: typeof raw.partyMembers === 'number' ? raw.partyMembers : 0,
      households: typeof raw.households === 'number' ? raw.households : undefined,
      population: typeof raw.population === 'number' ? raw.population : undefined,
      north: typeof raw.north === 'string' ? raw.north : '',
      south: typeof raw.south === 'string' ? raw.south : '',
      east: typeof raw.east === 'string' ? raw.east : '',
      west: typeof raw.west === 'string' ? raw.west : '',
      landmarks: Array.isArray(raw.landmarks)
        ? (raw.landmarks as unknown[]).filter((l): l is string => typeof l === 'string')
        : [],
      description: typeof raw.description === 'string' ? raw.description : '',
      coordinates: raw.coordinates as Village['coordinates'],
      polygon: raw.polygon as Village['polygon'],
    } satisfies Village;
  });
}

/**
 * Preloads a village image and returns success/failure.
 * Used to warm up the image cache before presentation transitions.
 */
export async function preloadImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
