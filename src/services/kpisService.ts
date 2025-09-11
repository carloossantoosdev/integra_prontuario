import type { KpiMonthly, KpiQueryParams, KpiUpsertInput } from '../types/kpis';
import { db } from '../utils/firebaseClient';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query as fbQuery,
  setDoc,
  where as fbWhere,
  orderBy as fbOrderBy,
} from 'firebase/firestore';

const TABLE = 'kpis_mensais';

export async function upsertKpiMonthly(input: KpiUpsertInput) {
  const refDate = `${input.refDate}-01`;
  const ref = doc(db, TABLE, refDate);
  // Garanta que ref_date exista no documento para consultas (orderBy/where)
  await setDoc(
    ref,
    { ref_date: refDate, metrics: input.metrics },
    { merge: true }
  );
  const snap = await getDoc(ref);
  return {
    id: snap.id,
    ref_date: refDate,
    ...(snap.data() as any),
  } as KpiMonthly;
}

export async function getKpis(params: KpiQueryParams = {}) {
  const constraints: any[] = [fbOrderBy('ref_date', 'asc')];
  if (params.from) constraints.push(fbWhere('ref_date', '>=', params.from));
  if (params.to) constraints.push(fbWhere('ref_date', '<=', params.to));
  const q = fbQuery(collection(db, TABLE), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d: any) => ({
    id: d.id,
    ...(d.data() as any),
  })) as KpiMonthly[];
}

export async function getKpiByMonth(yearMonth: string) {
  const ref = doc(db, TABLE, `${yearMonth}-01`);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as any) } as KpiMonthly;
}
