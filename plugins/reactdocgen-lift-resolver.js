
const {utils: docgenUtils} = require("react-docgen");
const {visit, namedTypes: t} = require("ast-types/main");
const {default: resolveHOC} = require("react-docgen/dist/utils/resolveHOC");
const {default: isReactForwardRefCall} = require("react-docgen/dist/utils/isReactForwardRefCall");

function ignore() {return false;}

function isLeadingWithComment(definition) {
    const leadingComments = (definition.parentPath.value.type === "ExportDefaultDeclaration") ? definition.parentPath.value.leadingComments : definition.value.leadingComments;
    if (!leadingComments) {
        return null;
    }
    const isTagged = leadingComments.reduce((acc, comment) => acc === true || comment.value.indexOf("@component") !== -1, [],);

    if (!isTagged) {
        return false;
    }        
    console.log("Found a tag");
    return true;
}
function isBaseComponentSuperClass(definition) {
    if(definition.value.superClass.name === 'BaseComponent') {
        return true;
    }
    return false;
}
function isComponentDefinition(path) {
    return(docgenUtils.isReactCreateClassCall(path) || docgenUtils.isReactComponentClass(path) || docgenUtils.isStatelessComponent(path) || isReactForwardRefCall(path) || isLeadingWithComment(path) || isBaseComponentSuperClass(path));
}

function resolveDefinition(definition)  {
        if(docgenUtils.isReactCreateClassCall(definition)) {
            const resolvedPath = docgenUtils.resolveToValue(definition.get('arguments', 0));
            if (t.ObjectExpression.check(resolvedPath.node)) {
                return resolvedPath;
            }
        } else if (docgenUtils.isReactComponentClass(definition)) {
            docgenUtils.normalizeClassDefinition(definition);
            return definition;
        } else if (docgenUtils.isStatelessComponent(definition) || isReactForwardRefCall(definition)) {
            return definition;
        } else if(isLeadingWithComment(definition)) {     
            docgenUtils.normalizeClassDefinition(definition);  
            return definition;
        } else if(isBaseComponentSuperClass(definition)) {
            docgenUtils.normalizeClassDefinition(definition);  
            return definition;
        }
        return null;
    }

/**
 * Given an AST, this function tries to find the exported component definitions.
 *
 * The component definitions are either the ObjectExpression passed to
 * `React.createClass` or a `class` definition extending `React.Component` or
 * having a `render()` method.
 *
 * If a definition is part of the following statements, it is considered to be
 * exported:
 *
 * modules.exports = Definition;
 * exports.foo = Definition;
 * export default Definition;
 * export var Definition = ...;
 */
module.exports = function (ast) {
    const components= [];

    function exportDeclaration(path) {
            const definitions = docgenUtils.resolveExportDeclaration(path).reduce((acc, definition) => {
                if (isComponentDefinition(definition)) {
                    acc.push(definition);
                } else {
                    const resolved = docgenUtils.resolveToValue(resolveHOC(definition));
                    if (isComponentDefinition(resolved)) {
                        acc.push(resolved);
                    }
                }
                return acc;
            }, []).map(definition => resolveDefinition(definition));
            if (definitions.length === 0) {
                return false;
            }
            definitions.forEach(definition => {
                if (definition && components.indexOf(definition) === -1) {
                    components.push(definition);
                }
            });
            return false;
        }

        visit(ast, {
            visitFunctionDeclaration: ignore,
            visitFunctionExpression: ignore,
            visitClassDeclaration: ignore,
            visitClassExpression: ignore,
            visitIfStatement: ignore,
            visitWithStatement: ignore,
            visitSwitchStatement: ignore,
            visitCatchCause: ignore,
            visitWhileStatement: ignore,
            visitDoWhileStatement: ignore,
            visitForStatement: ignore,
            visitForInStatement: ignore,

            visitExportDeclaration: exportDeclaration,
            visitExportNamedDeclaration: exportDeclaration,
            visitExportDefaultDeclaration: exportDeclaration,

            visitAssignmentExpression: function (path) {
                    // Ignore anything that is not `exports.X = ...;` or `module.exports = ...;`
                    if(!docgenUtils.isExportsOrModuleAssignment(path)) {
                        return false;
                    }
                    // Resolve the value of the right hand side. It should resolve to a call
                    // expression, something like React.createClass
                    path = docgenUtils.resolveToValue(path.get('right'));
                    if (!isComponentDefinition(path)) {
                        path = docgenUtils.resolveToValue(resolveHOC(path));
                        if (!isComponentDefinition(path)) {
                            return false;
                        }
                    }
                    const definition = resolveDefinition(path);
                    if (definition && components.indexOf(definition) === -1) {
                        components.push(definition);
                    }
                    return false;
                }
        });
    return components;
}