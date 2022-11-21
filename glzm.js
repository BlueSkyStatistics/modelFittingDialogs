

var localization = {
    en: {
        title: "Generalized Linear Model",
        navigation: "GLZM",
        modelname: "Model name",
        dependent: "Dependent variable",
        offset: "Offset",
        weights: "Weights",
        family: "Select a family and link function",
        help: {
            title: "Generalized Linear Model",
            r_help: "help(glm, package ='stats')",
            body: `
            <b>Description</b></br>
            glm is used to fit generalized linear models, specified by giving a symbolic description of the linear predictor and a description of the error distribution.
            <br/>
NOTE: When specifying a variable containing weights, be aware that since we use the option na.exlude to build the model, all NA values are automatically removed from the dependent and independent variables.<br/> 
This can cause a mismatch as NA values are NOT automatically removed from the weighting variable. <br/>
In this situation you will see the error variable lengths differ (found for (weights))<br/>
To address this error go to Variables>Missing Values>Remove NAs and select the dependent, independent variables and the weighting variable to remove missing values from and rebuild the model.<br/>
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            glm(formula, family = gaussian, data, weights, subset,
                na.action, start = NULL, etastart, mustart, offset,
                control = list(...), model = TRUE, method = "glm.fit",
                x = FALSE, y = TRUE, singular.ok = TRUE, contrasts = NULL, ...)
            </code> <br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            formula: an object of class "formula" (or one that can be coerced to that class): a symbolic description of the model to be fitted. The details of model specification are given under ‘Details’.
            </li>
            <li>
            family: a description of the error distribution and link function to be used in the model. For glm this can be a character string naming a family function, a family function or the result of a call to a family function. For glm.fit only the third option is supported. (See family for details of family functions.)
            </li>
            <li>
            data: an optional data frame, list or environment (or object coercible by as.data.frame to a data frame) containing the variables in the model. If not found in data, the variables are taken from environment(formula), typically the environment from which glm is called.
            </li>
            <li>
            weights: an optional vector of ‘prior weights’ to be used in the fitting process. Should be NULL or a numeric vector.
            </li>
            <li>
            subset: an optional vector specifying a subset of observations to be used in the fitting process.
            </li>
            <li>
            na.action: a function which indicates what should happen when the data contain NAs. The default is set by the na.action setting of options, and is na.fail if that is unset. The ‘factory-fresh’ default is na.omit. Another possible value is NULL, no action. Value na.exclude can be useful.
            </li>
            </ul>
            <b>Details</b><br/>
            A typical predictor has the form response ~ terms where response is the (numeric) response vector and terms is a series of terms which specifies a linear predictor for response. For binomial and quasibinomial families the response can also be specified as a factor (when the first level denotes failure and all others success) or as a two-column matrix with the columns giving the numbers of successes and failures. A terms specification of the form first + second indicates all the terms in first together with all the terms in second with any duplicates removed.<br/>
            <b>Value</b><br/>
            An object of class "glm" is a list containing at least the following components:
            <ul>
            <li>
            coefficients: a named vector of coefficients
            </li>
            <li>
            residuals: the working residuals, that is the residuals in the final iteration of the IWLS fit. Since cases with zero weights are omitted, their working residuals are NA.
            </li>
            <li>
            fitted.values: the fitted mean values, obtained by transforming the linear predictors by the inverse of the link function.
            </li>
            <li>
            rank: the numeric rank of the fitted linear model.
            </li>
            <li>
            family: the family object used.
            </li>
            <li>
            linear.predictors: the linear fit on link scale.
            deviance: up to a constant, minus twice the maximized log-likelihood. Where sensible, the constant is chosen so that a saturated model has deviance zero.
            </li>
            <li>
            aic	: A version of Akaike's An Information Criterion, minus twice the maximized log-likelihood plus twice the number of parameters, computed via the aic component of the family. For binomial and Poison families the dispersion is fixed at one and the number of parameters is the number of coefficients. For gaussian, Gamma and inverse gaussian families the dispersion is estimated from the residual deviance, and the number of parameters is the number of coefficients plus one. For a gaussian family the MLE of the dispersion is used so this is a valid value of AIC, but for Gamma and inverse gaussian families it is not. For families fitted by quasi-likelihood the value is NA.
            </li>
            </ul>
            <b>Package</b></br>
glm</br>
<b>Help</b></br>
help(glm, package ='stats')
`}
    }
}

class glzm extends baseModal {
    constructor() {
        var config = {
            id: "glzm",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(MASS);
require(equatiomatic);
require(textutils);
{{selected.modelname | safe}} = glm({{selected.dependent | safe}}~{{selected.formula | safe}},family ={{selected.family | safe}}(link="{{selected.combokid | safe}}"), {{if(options.selected.weights != "")}}weights = {{selected.weights | safe}},{{/if}} na.action=na.exclude, data={{dataset.name}})
#Display theoretical model equation and coefficients
#Display theoretical model
reg_formula = equatiomatic::extract_eq({{selected.modelname | safe}}, raw_tex = FALSE,\n\t wrap = TRUE, intercept = "alpha", ital_vars = FALSE)  
BSkyFormat(reg_formula)
#Display coefficients
reg_equation = equatiomatic::extract_eq({{selected.modelname | safe}}, use_coefs = TRUE,\n\t wrap = TRUE,ital_vars = FALSE, coef_digits = BSkyGetDecimalDigitSetting() )
BSkyFormat(reg_equation)
BSky_GLM_Summary_{{selected.modelname | safe}} = summary({{selected.modelname | safe}})
BSkyFormat(BSky_GLM_Summary_{{selected.modelname | safe}})
{{if (options.selected.combokid =="log" || options.selected.combokid =="logit")}}
#Exponents of the coefficients and 95% confidence interval
BSkyFormat(exp(cbind(Exp_Coeff=coef({{selected.modelname | safe}}),confint.glm({{selected.modelname | safe}},level=0.95))),singleTableOutputHeader='Exponentiated coefficient estimates and 95% confidence intervals')
{{/if}}
#Adding attributes to support scoring
attr(.GlobalEnv\${{selected.modelname | safe}},"classDepVar")= class({{dataset.name}}[, c("{{selected.dependent | safe}}")])
attr(.GlobalEnv\${{selected.modelname | safe}},"depVarSample")= sample({{dataset.name}}[, c("{{selected.dependent | safe}}")], size = 2, replace = TRUE)
`
        }
        var objects = {
            modelname: {
                el: new input(config, {
                    no: 'modelname',
                    label: localization.en.modelname,
                    placeholder: "",
                    value:"GLZM1",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    type: "character",
                    overwrite: "dataset"
                })
            },
            content_var: { el: new srcVariableList(config, {action: "move",scroll: true }) },
            dependent: {
                el: new dstVariable(config, {
                    label: localization.en.dependent,
                    no: "dependent",
                    filter: "Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            formulaBuilder: {
                el: new formulaBuilder(config, {
                    no: "formula",
                    label: localization.en.dependent,
                })
            },
            offset: {
                el: new dstVariable(config, {
                    label: localization.en.offset,
                    no: "offset",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            weights: {
                el: new dstVariable(config, {
                    label: localization.en.weights,
                    no: "weights",
                    filter: "Numeric|Scale",
                    extraction: "Prefix|UseComma",
                })
            },
            family: {
                el: new comboBoxWithChilderen(config, {
                    no: 'family',
                    nochild: 'combokid',
                    label: localization.en.family,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [
                        { "name": "gaussian", "value": ["identity", "inverse", "log"] },
                        { "name": "binomial", "value": ["logit", "probit", "cauchit","log","cloglog"] },
                        { "name": "poisson", "value": [ "log","identity", "sqrt"] },
                        { "name": "Gamma", "value": ["inverse","identity",  "log"] },
                        { "name": "inverse.gaussian", "value": ["1/mu^2","identity", "inverse", "log" ] },
                        { "name": "quasi", "value": [ "logit","probit","cloglog","identity","inverse", "log", "1/mu^2","sqrt"     ] },
                        { "name": "quasibinomial", "value": ["logit", "probit", "cloglog"] },
                        { "name": "quasipoisson", "value": ["log","identity",  "sqrt"] },
                    ]
                })
            },
        }
        const content = {
            head: [objects.modelname.el.content],
            left: [objects.content_var.el.content],
            right: [objects.dependent.el.content, objects.formulaBuilder.el.content, objects.offset.el.content, objects.weights.el.content,],
            bottom: [objects.family.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-glz",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new glzm().render()