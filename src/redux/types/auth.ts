export type Operation = {
  id: string;
  date: string;
  desc: string;
  category: string;
  sum: number;
  type: "expense" | "income";
};
