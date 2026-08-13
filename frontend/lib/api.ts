const API_URL = process.env.INTERNAL_API_URL || "http://localhost:8080/api";

export type Categoria = {
  id: string;
  name: string;
  slug: string;
};

export type Artigo = {
  id: string;
  title: string;
  slug: string;
  metaDescription: string;
  content: string;
  coverImageUrl?: string | null;
  categoryId: string;
  category?: Categoria;
  publishedAt: string | null;
};

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Fetch falhou (${res.status}):`, url);
      return fallback;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error("Erro de fetch durante build:", url, err);
    return fallback;
  }
}

export function getCategorias() {
  return safeFetch<Categoria[]>(`${API_URL}/categories`, []);
}

export function getArtigos(categorySlug?: string) {
  const url = categorySlug
    ? `${API_URL}/articles?categorySlug=${categorySlug}`
    : `${API_URL}/articles`;
  return safeFetch<Artigo[]>(url, []);
}

export function getArtigoPorSlug(slug: string) {
  return safeFetch<Artigo | null>(`${API_URL}/articles/${slug}`, null);
}