export const makeDocStub = <T extends { id: string }>({ id, ...data }: T) => ({
  id,
  data() {
    return data;
  },
});
