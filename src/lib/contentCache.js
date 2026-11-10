import client from './contentful';

// Share successful responses and in-flight requests for this browser session.
const requests = new Map();
export function loadEntries(contentType) {
  if (!requests.has(contentType)) {
    const request = client.getEntries({ content_type: contentType,
      order: contentType === 'newsPost' ? '-fields.date' : '-fields.year', limit: 50,
    }).catch(error => { requests.delete(contentType); throw error; });
    requests.set(contentType, request);
  }
  return requests.get(contentType);
}
