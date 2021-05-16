const Helper = {

    fillTemplate(templateString, templateValues) {

        var filledString = ""
        
        var stringFragments = templateString.split("{{")

        filledString += stringFragments[0]
        stringFragments = stringFragments.slice(1)

        for (const fragment of stringFragments) {

            var subFragments = fragment.split("}}");
            var firstFragment = subFragments[0]
            
            if (!(firstFragment in templateValues)) {
                throw new Error(`Cannot fill template without a value for ${firstFragment}`)
            }

            filledString += templateValues[subFragments[0]]
            filledString += subFragments[1]
            
        }

        return filledString

    },

    findTemplateValues(templateString) {

        var templateValues = []

        var stringFragments = templateString.split("{{")
        stringFragments = stringFragments.slice(1)

        for (const fragment of stringFragments) {
            templateValues.push(fragment.split("}}")[0])
        }

        return templateValues
        
    }

}

module.exports = Helper

// ts = "{{test}}, {{test2}}"
// tv = {test: "mhm", test2: "mmmhhhmmmmm"}
// console.log(Helper.fillTemplate(ts, tv))

// console.log(Helper.findTemplateValues("{{Wow}}, yes ye {{Oh man}} keep filling that {{Boy}}"))