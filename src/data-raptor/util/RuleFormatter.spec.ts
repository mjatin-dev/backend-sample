import { RuleFormatter } from './RuleFormatter';
import {
  ruleWithSubQueries as ruleWithSubQueriesMock,
  transformedRuleWithSubQueries as transformedRuleWithSubQueriesMock,
} from '../../../mock-data/data-raptor/rule.data';
import _ from 'lodash';

describe('Rule Formatter Util', () => {
  describe('processing a rule that has sub queries', () => {
    let ruleWithSubQueries;
    let transformedRuleWithSubQueries;
    beforeEach(() => {
      ruleWithSubQueries = _.cloneDeep(ruleWithSubQueriesMock);
      transformedRuleWithSubQueries = _.cloneDeep(
        transformedRuleWithSubQueriesMock,
      );
    });
    it('can return tables dependencies correctly', () => {
      const tableDependencies = RuleFormatter.getTableDependencies(
        ruleWithSubQueries.rule,
      );
      expect(tableDependencies).toEqual(['Account', 'Opportunity', 'User']);
    });
    it('can return the formatted version of the rule', () => {
      const tenantId = 10;
      const dataSourceId = '4ccd6956-f0a9-4b22-b6e0-c203f2ba4a8a';
      const formattedRule = RuleFormatter.getFormattedRule(
        tenantId,
        dataSourceId,
        transformedRuleWithSubQueries,
      );
      const ruleClone = _.cloneDeep(transformedRuleWithSubQueries);
      expect(formattedRule).not.toEqual(ruleClone);
    });
  });
});
