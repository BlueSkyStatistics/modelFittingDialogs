const nav = {
    "name": "Model Fitting",
    "tab": "model_fitting",
    "buttons": [
        {
            "name": "Contrasts",
            "icon": "icon-brightness-and-contrast",
            "children": [
                "./contrastsDisplay",
                "./contrastsSet"
            ]
        },
        "./glzm",
        {
            "name": "KNN",
            "icon": "icon-network",
            "children": [
                "./KNN",
                "./KNNPredict"
            ]
        },
      {
            "name": "Regression",
            "icon": "icon-linear_regression_white_comp",
            "children": [
                "./Survival/CoxWithFormula",
                "./Survival/CoxSingleModel",
                "./linearRegression",
                "./linearRegressionLegacy",
                "./linearRegressionFormula",
                "./logisticRegression",
                "./logisticRegressionFormula",
                "./multiNomialLogistic",
                "./ordinalRegression",
                "./quantileregression",
            ]
        },
        "./mixedModelsBasic",
        "./naiveBayes",
        {
            "name": "Neural Nets",
            "icon": "icon-brain",
            "children": [
                "./multiLayerPerceptron",
                "./neuralNets"
            ]
        },
        {
            "name": "Trees",
            "icon": "icon-tree",
            "children": [
                "./decisionTrees",
                "./extremeGradientBoosting",
                "./randomForest",
                "./optimalNoTrees",
                "./tuneRandomForest"
            ]
        },
        "./saveAModel",
        "./loadAModel"
        
    ]
}

module.exports.nav = nav
