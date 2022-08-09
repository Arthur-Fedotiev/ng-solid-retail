export const makeCollectionStub = <T extends readonly { id: string }[]>(
  data: T
) => ({
  docs: data.map(({ id, ...product }) => ({
    id,
    data() {
      return product;
    },
  })),
});
