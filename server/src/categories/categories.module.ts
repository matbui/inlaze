import { Module  } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
    imports: [HttpModule ], 
    providers: [CategoriesService],
    controllers: [CategoriesController],
})
export class CategoriesModule {}
