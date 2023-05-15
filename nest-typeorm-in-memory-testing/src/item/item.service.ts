import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entity/item.entity';
import { Repository } from 'typeorm';
import { ItemDTO } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) private readonly repo: Repository<Item>) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async create(dto: ItemDTO): Promise<ItemDTO> {
    return this.repo.save(dto.toEntity({ id: null })).then((e) => ItemDTO.fromEntity(e));
  }
}
