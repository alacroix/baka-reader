export function generateQuickGuid() {
  return Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
}

export const BookStatusEnum = {
  NEW: 0,
  IN_PROGRESS: 1,
  DONE: 2,
};

export default {

};
