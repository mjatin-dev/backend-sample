import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { TenantSalesforceConfigurationsRepository } from './repositories/tenantSalesforceConfigurations.repository';
import { UpdateResult } from 'typeorm';
import {
  ConfigurationFieldDto,
  CreateTenantSalesforceConfigurationsDto,
} from './dto/create-configurations.dto';
import { SalesforceConfigurationFieldsRepository } from './repositories/saleforceConfigurationFields.repository';
import { SalesforceConfigurationObjectsRepository } from './repositories/saleforceConfigurationObject.repository';

@Injectable()
export class DuplicateConfigurationService {
  constructor(
    private readonly tenantSalesforceConfigurationsRepository: TenantSalesforceConfigurationsRepository,
    private readonly salesforceConfigurationFieldsRepository: SalesforceConfigurationFieldsRepository,
    private readonly salesforceConfigurationObjectsRepository: SalesforceConfigurationObjectsRepository,
  ) {}

  /**
   * Get all configuration fields
   * @returns
   */
  async getConfigurationFields() {
    try {
      return await this.salesforceConfigurationFieldsRepository.find();
    } catch (error) {
      throw new Error('Error getting configuration fields');
    }
  }

  /**
   * Get all configuration objects
   * @returns
   */
  async getConfigurationObjects() {
    try {
      return await this.salesforceConfigurationObjectsRepository.find();
    } catch (error) {
      throw new Error('Error getting configuration objects');
    }
  }
  /**
   * Create threshold based on tenantId
   * @param tenantId
   * @param threshold
   * @returns
   */
  @Transactional()
  async createThreshold(
    tenantId: number,
    threshold: number,
  ): Promise<CreateTenantSalesforceConfigurationsDto | UpdateResult> {
    try {
      const tenantSalesforceConfiguration =
        await this.tenantSalesforceConfigurationsRepository.findOne({
          tenantId,
        });
      if (!tenantSalesforceConfiguration) {
        tenantSalesforceConfiguration.threshold = threshold;
        return await this.tenantSalesforceConfigurationsRepository.save(
          tenantSalesforceConfiguration,
        );
      } else {
        const updatedTenantSalesforceConfiguration =
          this.tenantSalesforceConfigurationsRepository.update(
            {
              tenantId,
            },
            {
              threshold,
            },
          );

        return updatedTenantSalesforceConfiguration;
      }
    } catch (error) {}
  }

  /**
   * Update threshold based on tenantId
   * @param tenantId
   * @param threshold
   * @returns
   */
  @Transactional()
  async updateThreshold(
    tenantId: number,
    threshold: number,
  ): Promise<UpdateResult> {
    try {
      return await this.tenantSalesforceConfigurationsRepository.update(
        { tenantId },
        { threshold },
      );
    } catch (error) {
      throw new Error('Error updating threshold');
    }
  }

  /**
   * Create configuration based on tenantId
   * @param tenantId
   * @param configurationFields
   * @returns
   */
  @Transactional()
  async createConfiguration(
    tenantId: number,
    configurationFields: ConfigurationFieldDto[],
  ) {
    try {
      return await this.tenantSalesforceConfigurationsRepository.save({
        tenantId,
        configurationFields: configurationFields,
      });
    } catch (error) {
      throw new Error('Error creating configuration');
    }
  }

  /**
   * Update configuration based on tenantId
   * @param tenantId
   * @param configurationFields
   * @returns
   */
  @Transactional()
  async updateConfiguration(
    tenantId: number,
    configurationFields: ConfigurationFieldDto[],
  ) {
    try {
      return await this.tenantSalesforceConfigurationsRepository.update(
        { tenantId },
        { configurationFields: configurationFields },
      );
    } catch (error) {
      throw new Error('Error updating configuration');
    }
  }

  /**
   * List all configurations based on tenantId
   * @param tenantId
   * @returns
   */
  async getConfiguration(tenantId: number) {
    try {
      return await this.tenantSalesforceConfigurationsRepository.findOne({
        tenantId,
      });
    } catch (error) {
      throw new Error('Error getting configuration');
    }
  }
}
