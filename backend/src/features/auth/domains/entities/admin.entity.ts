import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class AdminEntity {
  @ApiProperty({
    example: '68b4d59919d9b7a94b4fde21',
    description: "Identifiant unique MongoDB de l'admin",
  })
  private readonly id: mongoose.Types.ObjectId;

  @ApiProperty({
    example: 'admin',
    description: "Identifiant (login) de l'admin",
  })
  private readonly identifiant: string;

  private readonly passwordHash: string;

  constructor(
    _id: mongoose.Types.ObjectId,
    identifiant: string,
    passwordHash: string,
  ) {
    this.id = _id;
    this.identifiant = identifiant;
    this.passwordHash = passwordHash;
  }

  // ———————GETTER———————

  getId(): string {
    return this.id.toString();
  }

  getObjectId(): mongoose.Types.ObjectId {
    return this.id;
  }

  getIdentifiant(): string {
    return this.identifiant;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}
