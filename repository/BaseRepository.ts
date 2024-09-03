  import { Model, ModelStatic, FindOptions, CreateOptions, UpdateOptions, DestroyOptions, ScopeOptions, WhereAttributeHash } from 'sequelize';

  export abstract class BaseRepository<T extends Model> {
    protected model: ModelStatic<T>;
    protected scopedModel: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
      this.model = model;
      this.scopedModel = model;
    }

    applyScope(scope: string | ScopeOptions | readonly (string | ScopeOptions)[] | WhereAttributeHash<T>): this {
      const scopedInstance = Object.create(this); // Create a new instance of the current repository
      scopedInstance.scopedModel = this.model.scope(scope); // Apply the scope to the new instance
      return scopedInstance; // Return the new instance
    }

    async findAll(options?: FindOptions<T>): Promise<T[]> {
      return this.scopedModel.findAll(options);
    }

    async findOne(options: FindOptions<T>): Promise<T | null> {
      return this.scopedModel.findOne(options);
    }

    async findByPk(id: T['_attributes']['id'], options?: FindOptions<T>): Promise<T | null> {
      return this.scopedModel.findByPk(id, options);
    }

    async create(data: T['_creationAttributes'], options?: CreateOptions<T>): Promise<T> {
      return this.scopedModel.create(data, options);
    }

    async update(data: Partial<T['_attributes']>, options: UpdateOptions<T>): Promise<[number, T[]]> {
      const [affectedCount] = await this.scopedModel.update(data, options);
      const updatedInstances = await this.scopedModel.findAll(options);
      return [affectedCount, updatedInstances];
    }

    async destroy(options: DestroyOptions<T>): Promise<number> {
      return this.scopedModel.destroy(options);
    }

    async findOrCreate(options: FindOptions<T>, defaults: T['_creationAttributes']): Promise<[T, boolean]> {
      return this.scopedModel.findOrCreate({ where: options.where, defaults });
    }

    async bulkCreate(data: T['_creationAttributes'][], options?: CreateOptions<T>): Promise<T[]> {
      return this.scopedModel.bulkCreate(data, options);
    }

    async count(options?: FindOptions<T>): Promise<number> {
      return this.scopedModel.count(options);
    }

    async sum(field: keyof T['_attributes'], options?: FindOptions<T>): Promise<number> {
      return this.scopedModel.sum(field as string, options);
    }

    async max(field: keyof T['_attributes'], options?: FindOptions<T>): Promise<number | string> {
      return this.scopedModel.max(field as string, options);
    }

    async min(field: keyof T['_attributes'], options?: FindOptions<T>): Promise<number | string> {
      return this.scopedModel.min(field as string, options);
    }

    async findAndCountAll(options?: FindOptions<T>): Promise<{ rows: T[]; count: number }> {
      return this.scopedModel.findAndCountAll(options);
    }

    async increment(field: keyof T['_attributes'], options: UpdateOptions<T>, by: number = 1): Promise<void> {
      await this.scopedModel.increment(field as string, { ...options, by });
    }

    async decrement(field: keyof T['_attributes'], options: UpdateOptions<T>, by: number = 1): Promise<void> {
      await this.scopedModel.decrement(field as string, { ...options, by });
    }
  }
