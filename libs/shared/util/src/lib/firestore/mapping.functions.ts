import firebase from 'firebase/compat/app';
import { WithId } from '../types/data.interfaces';

export const convertOneSnap = <T>(snap: any): T =>
  <WithId<T>>{
    id: snap.id,
    ...snap.data(),
  };

export function convertSnaps<T>(
  snaps: firebase.firestore.QuerySnapshot<T>
): WithId<T>[] {
  return <WithId<T>[]>snaps.docs.map(convertOneSnap);
}

export function convertSnapsToDictionary<T, P = unknown>(
  snaps: firebase.firestore.QuerySnapshot<P>
): WithId<T> {
  return <WithId<T>>(
    snaps.docs.reduce((acc, snap) => ({ ...acc, [snap.id]: snap.data() }), {})
  );
}
