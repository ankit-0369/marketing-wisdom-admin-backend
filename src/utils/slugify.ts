

export const slugify= (title: string): string=>{
     return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")     // Remove special characters
    .replace(/\s+/g, "-")             // Replace spaces with dashes
    .replace(/-+/g, "-");             // Collapse multiple dashes
}