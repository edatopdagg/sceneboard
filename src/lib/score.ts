
export type ItemInput = {
  title?: string;
  description?: string;
  amount?: number;
  genre?: string;
  durationMin?: number;
  tags?: string; 
};

export function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export function calculateRisk(input: ItemInput): number {
  let score = 50; 

  const genre = (input.genre || "").toLowerCase().trim();
  const desc = (input.description || "").toLowerCase();
  const tags = (input.tags || "").toLowerCase();
  const amount = Number(input.amount || 0);
  const dur = Number(input.durationMin || 0);

 
  if (genre === "drama") score -= 15;       
  if (genre === "korku" || genre === "horror") score += 10; 
  if (genre === "deneysel" || genre === "experimental") score += 8;

  if (dur <= 6) score -= 10;
  else if (dur > 12) score += 10;

  if (amount > 50000) score += 15;
  else if (amount <= 5000) score -= 5;


  if (desc.includes("festival")) score -= 10;
  if (desc.includes("kanlı") || desc.includes("gore")) score += 10;

  if (tags.split(",").map(s=>s.trim()).includes("experimental")) score += 10;
  if (tags.includes("student") || tags.includes("öğrenci")) score -= 5;

  
  return clamp(Math.round(score));
}
