import admin from 'firebase-admin';

const serviceAccount = {
  projectId: "glowify-ai-system",
  clientEmail: "firebase-adminsdk-fbsvc@glowify-ai-system.iam.gserviceaccount.com",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpO3cV1x0TxLIF\nNua9Tl2kwdq4ReXaYCbpeyACqEqvNSTD7sUPGyBVUox/s+K5X03fdfzvWRQQpdyD\nOG50JcGEuj9+TaEr4bWUlO6CWJ07azMbP9zjlNzjfhW5aQuTQ5oXykcz1AvCnaG9\nFvfpCFR4NgTARXZnl5vzHvv++2NxOyldeBs5ciYn/IEUQ6cPOQnSWNgPTerW/Oju\neKzmSGVy1D886uCw8/lEYgZdJm5SPOTJLczoubs+SIwtU8PQaSWP7rpCxCYt4Y5E\nVeCCaP2RncsTcpN3dzpYvk/A+jWsIyG5w2K5AdZKJViSzHZSsGv8kcgRB2INERQS\nL/435GRtAgMBAAECggEAB/v6PlmL0abyDzTr5fqQiHls7Ey/73Gh5FoexIFUJLgJ\nKAVX3sKU3/GpF01RYRWSAvz6FgDJ5Y8tvDMpYul1G+H9pOPcuslHW9868YNkx6zj\nGGIG9eXMFh+Yvsqp9SS3XG/6tANJGsF9JAK1Z5UxBwrlZnzgfTq17N6FXR5XLrxc\nJVEH2zM3/THCR/C78kcqgItxtKrU0Iw5R361jY/BO4k6j+XGOo1qiJ/ekxnQQ+aF\n3XFZQGRUBPQkhJqo52eOijU/PtC8+kiCEMUvuj8jZKRDZ+tau16Dzz7k1GHtTzcn\n5qS2Sq/6IBgoDTQZH25akVGjaKubP7oEZxGEtAQbMQKBgQDdriAjz0AbUBiqwbFA\nFVR8L2E405YD4UvBAu31Yb1o3OuAZohYfIcRCYrw0CNrkgHXfwqESICpun8/1Mh/\nZifyuWjkkDVJkU+gxvQcOwLd4+XKmBESsdAKwUCncrOvrt1XOiPpKjPJTOrl2I58\nT1DaP1fXFFdUSk5xeNJCgjAsswKBgQDDbqqp5napxjFgSGMNo9w1kUD0/7sXXO7v\nT+O3fs37+2B1OQw/+ylBz1b8Iqv2r8WrQ5RSv43Q1D+84mG+x5vHuLwHCai18eQH\n4MwIjGCwa9fKfCVXJkDrjf56qciJNN8zAGZvV095RzkcgkLAbWSz4KUuud8WbTY0\njvDLeq/6XwKBgDAbL2JWAWVr9k5oBh0QA+uHJKP+Vpm09ImIJzeO5FmzR2/v0DrT\nm0P5PCuSH32ii7/GE/Qs/67Vh/PEK1ZqRtUHo1mmacnzPMJ5KlROAgtA/4b9hQb3\ni1wqH+u2moPPgL0DIvPgcqiGhpsmaZVUaQlToa5M/b6O+YLqY0aHlgi9AoGAbQ1h\n2jCp4o6fmtSJwWDATnvhPVU+Nwk6ovt3XDs8AfIBnyfYOBOUsA5cwZEvWBY5PRoW\nuB3/qpnlfybr2CNWQBpLgbnYFL8HuYWtFNAQXCGxZmHkDD9iVo8Dg7seFcIVEkaU\n4mhcBpbBvbDKQspIOT+PrQU3ATKr3qQspb6uWA0CgYEAifKmN7IEChIj7H9GVkFg\nz4V+xpSpGFnWDgyUYDiX4vHjIMd0NQpi7nAm8k5l50olUm6T/5ANft3l2AAqBiJx\n6A/EQic5HtSQCwXJKLAj5mR7n4YZvGuF32uZAELmJLoFNAD82FuclBN1Jx+Y/guY\nEye4OK8TxEJqCQolPfnb7Us=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin initialized successfully!");
  
  const db = admin.firestore();
  const collections = await db.listCollections();
  console.log(`✅ Connection verified. Found ${collections.length} collections.`);
  
  process.exit(0);
} catch (error) {
  console.error("❌ Firebase Admin initialization failed:");
  console.error(error);
  process.exit(1);
}
