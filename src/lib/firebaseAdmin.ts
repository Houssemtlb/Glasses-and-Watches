import * as admin from "firebase-admin";


const key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQz8GSU0QUp9N+\nhnkjm1kznQc4YWVW4msHA5Y/u+Jr52zgd8muQy4h+NMe85J7xSvZf9P2suaqV5+r\nmXvM7qp6L6cgBBjb57YDx8Zk3+tJgX294NgEKiGpiqhbhhNTMqB/d943Y2HT8Lc4\nUng1SqyUcuZhge4CPpTrZKkpaYUi8/TE5au4S9/CwMiH2TTfB0G78BEfY86VFhCt\nrgop1Sn7JhHiEjccMDPq6uJKeOUp1hDVvGMqC0yXbQyr4ZMyRPSw7fmyhYeV6m6H\n1+XVyGVYIF3DSsb99p6snDML1wNflqIMhebcVfmF5RN1i7bJrfLaE5CAR56MQV4j\nDLeU7q+5AgMBAAECggEAEDqNY1d4W5idjeBaquNIgAPsyzt6mlGXmuBy/XoXQ2al\nph55PMN44ugJVIb+tALjgRB3w10tI0ETJk2T+x3zfvKULR9UZUbxdQLCTxW+HiTj\nxm2irFQv8JLXueFGQDmXksCYszpUoJm9S7HRKOcoWZNCh4KHIoKFpXPZ19+dGtWx\n/Ow0DfLNwwh/gIiwTxqNLq8LcpHTREIw9ZufdwqYkGswf33BNtgU1vfxhX8IXgNz\nSrsGjRLvsBJzcuB+MFKTIxFEcM03KDK8IWlYeE00DDze6CEBX6RJo6O1tyhpIMGZ\n78MmAce4dR1WhM/5uT5+9zk2Z+Wers7BUOxg1xffGQKBgQD50YkG+9uzKI/+SCNQ\nHKnaVc6NJ6FCGOezhVh0FTP5NqaR5JjhkmrgvwRnFRUapFi8IzWkKFJBuVZe6xNt\nQTQTUiXklcQUYJGhCRDbccsybVCOlsEl/8KkEl7N6i6iinQ/XQCNYzBr5CX1WS79\n/Y6DuJ2NAF+l1U5Q3Tnt9LTTZQKBgQDV+nbOF7FNAM8IRK07SuDeutU9OI6DO6Yy\nv4M+cZubN8HFqq7M84dE/uDNaXtR2DOoxgLmTh5t2r1D0DzxgSYESzw1Rn0mCc1K\nCFDI0Z9yOQu2S5PhvurchoUy7aHUf3RTL+5noALv7H5gOG7J3/B7CAU5MnQ366AK\nf900DZtHxQKBgQDaUTR35vh73FHiPbamlzYUuXI1x1FUyyEJsNm5MKJoA0uUKfs0\n/ljqqeQ2FaWIz+FAIWEKYbZo+4gwkS08CIRy8hJtbjiaOj5qRdr2e77BBeklgzeu\ndpHqAqfZOfOhVm/6w9LsvKcfUpWdkV/Q1ZqLIHaHN7Fe4kd7wamTe4vfRQKBgD/d\n3yIKblAmgqTcIryEz/OK3mTEgbzny+ZvxROZQzGkBcEi/cOMmH5eeOi2qCk4l8qz\nN2BYRrrRRBZ+jAIlYxx6/ECGhooY+N409y/JaYblQfqqOjxyCJXDzPPze476b9T4\nhHcHinjkJKBBl8fHgHaoYS6+QXQDbyRTH8oOmZ9lAoGAOj7UpL/HhhVGqUygZ/vc\njhSgyW0eyrTcukjPcFj1M8eNSyG6V83SiTOJd/cKjbExOOW5UkR42fH2aILdXpmY\n01jRcvTnfyrRwXNQ2uuOoEUJXkkfirgDlog0w5cEfTvcSbN63+k/em+2xA/Y3/6y\nXsYuDvAvsi31JGpulOre/ZI=\n-----END PRIVATE KEY-----\n"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "glasses-watches",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: "glasses-watches.appspot.com",
  });
}

const bucket = admin.storage().bucket();

export { admin, bucket };