import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { AppModule } from '../src/app.module';
import {
  Project,
  ProjectDocument,
} from '../src/features/projects/domains/schemas/project.schema';

function hasFlag(name: string): boolean {
  return process.argv.includes(`--${name}`);
}

function fillFromImg<T extends { img?: string }>(
  target: T,
  field: keyof T,
): boolean {
  if (!target[field] && target.img) {
    (target[field] as unknown as string) = target.img;
    return true;
  }
  return false;
}

async function bootstrap(): Promise<void> {
  const apply = hasFlag('apply');

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  const projectModel = app.get<Model<ProjectDocument>>(
    getModelToken(Project.name),
  );

  try {
    const docs = await projectModel.find().exec();
    console.log(
      `${docs.length} projet(s) trouvé(s). Mode : ${
        apply ? 'APPLICATION' : 'DRY-RUN (aucune écriture)'
      }\n`,
    );

    let modifiedCount = 0;

    for (const doc of docs) {
      const changes: string[] = [];

      if (doc.hero) {
        if (fillFromImg(doc.hero, 'imgSource')) changes.push('hero.imgSource');
        if (fillFromImg(doc.hero, 'imgCarousel'))
          changes.push('hero.imgCarousel');
        if (fillFromImg(doc.hero, 'imgThumbnail'))
          changes.push('hero.imgThumbnail');
        if (changes.length > 0) doc.markModified('hero');
      }

      doc.drawings?.forEach((drawing, idx) => {
        if (fillFromImg(drawing, 'imgSource')) {
          changes.push(`drawings[${idx}].imgSource`);
          doc.markModified('drawings');
        }
      });

      doc.gallery?.forEach((item, idx) => {
        if (fillFromImg(item, 'imgSource')) {
          changes.push(`gallery[${idx}].imgSource`);
          doc.markModified('gallery');
        }
      });

      if (changes.length > 0) {
        modifiedCount++;
        console.log(`• ${doc.slug} : ${changes.join(', ')}`);
        if (apply) await doc.save();
      }
    }

    console.log(
      `\n${
        apply ? '✓ Migration appliquée' : 'Dry-run terminé'
      } : ${modifiedCount}/${docs.length} projet(s) ${
        apply ? 'mis à jour' : 'seraient mis à jour'
      }.`,
    );
    if (!apply && modifiedCount > 0) {
      console.log('Relancer avec --apply pour écrire les modifications.');
    }
  } catch (error) {
    const err = error as Error;
    console.error(`✗ Erreur : ${err.message}`);
    await app.close();
    process.exit(1);
  }

  await app.close();
  process.exit(0);
}

bootstrap().catch((error) => {
  console.error('Erreur fatale à la migration des images :', error);
  process.exit(1);
});
