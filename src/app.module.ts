import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { PaymentsModule } from './payments/payments.module';
import { CertificatesModule } from './certificates/certificates.module';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI!),

    AuthModule,
    UsersModule,
    CoursesModule,
    AssignmentsModule,
    AnalyticsModule,
    LeaderboardModule,
    PaymentsModule,
    CertificatesModule,
    BlockchainModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}