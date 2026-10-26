import { createHmac } from 'crypto';

// Copie de chaque demande de contact vers l'inbox du second cerveau d'Enzo (cerveau.zenixweb.fr).
// Requête signée : HMAC-SHA256 de « <timestamp>.<corps> » avec un secret partagé, le cerveau refuse
// toute requête non signée ou de plus de 5 minutes. Un échec ici ne doit jamais bloquer le formulaire :
// l'email à ADMIN_EMAIL reste le canal principal.
export function signerCerveau(secret, timestamp, corps) {
  return 'sha256=' + createHmac('sha256', secret).update(`${timestamp}.${corps}`).digest('hex');
}

export async function notifierCerveau(url, secret, donnees, fetchImpl = fetch) {
  if (!url || !secret) return false;
  const corps = JSON.stringify(donnees);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const reponse = await fetchImpl(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Cerveau-Timestamp': timestamp,
      'X-Cerveau-Signature': signerCerveau(secret, timestamp, corps),
    },
    body: corps,
    signal: AbortSignal.timeout(5000),
  });
  if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
  return true;
}
