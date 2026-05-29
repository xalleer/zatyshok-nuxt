const generateSlugFromName = (name: string) => {
    const cyrillicToLatin: Record<string, string> = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ie',
        'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'i', 'й': 'i', 'к': 'k', 'л': 'l',
        'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '',
        'ю': 'iu', 'я': 'ia', ' ': '-'
    }

    const transliterated = name.toLowerCase().split('').map(char => cyrillicToLatin[char] || char).join('')
    return transliterated.replace(/[^a-z0-9-]/g, '-').replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '')
}

export const getSlug = (name: string) => {
    return generateSlugFromName(name)
}

export const getPublicUrl = (slug: string) => {
    return `https://zatyshok.ua/${slug}`
}