import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseAuthService {
  constructor(private configService: ConfigService) {
    if (!admin.apps.length) {
      try {
        const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
        const clientEmail = this.configService.get<string>(
          'FIREBASE_CLIENT_EMAIL',
        );
        const privateKey = this.configService
          .get<string>('FIREBASE_PRIVATE_KEY')
          ?.replace(/\\n/g, '\n');

        if (!projectId || !clientEmail || !privateKey) {
          console.error('Firebase credentials are missing:', {
            projectId: !!projectId,
            clientEmail: !!clientEmail,
            privateKey: !!privateKey,
          });
          throw new Error('Firebase credentials not properly configured');
        }

        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });
        console.log(
          'Firebase initialized successfully with project:',
          projectId,
        );
      } catch (error) {
        console.error('Error initializing Firebase:', error);
        throw error;
      }
    }
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken | null> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch {
      return null;
    }
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      return !!userRecord;
    } catch {
      return false;
    }
  }

  async createUserInFirebase(email: string, password: string): Promise<void> {
    try {
      await admin.auth().createUser({
        email,
        password,
      });
    } catch (error) {
      throw new Error('Error al crear el usuario en Firebase', error);
    }
  }
}
