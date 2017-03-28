var ModalManager = {};

//3d text hardcode
function createMesh(geom) {
    // assign two materials
    //          var meshMaterial = new THREE.MeshLambertMaterial({color: 0xff5555});
    //          var meshMaterial = new THREE.MeshNormalMaterial();
    var meshMaterial = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        color: 0xeeffff,
        shininess: 100,
        metal: true
    });
    //          meshMaterial.side=THREE.DoubleSide;
    // create a multimaterial
    var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
    return plane;
}

function insert3DText(options) {

    var loader = new THREE.FontLoader();
    loader.load('http://localhost:3001/examples/helvetiker_regular.typeface.json', function(font) {
        var textOptions = options;
        // {
        //     size: 50,
        //     height: 50,
        //     weight: 'regular',
        //     font: font,
        //     style: 'normal',
        //     bevelThickness: 2,
        //     bevelSize: 4,
        //     bevelSegments: 3,
        //     bevelEnabled: true,
        //     curveSegments: 12,
        //     steps: 1
        // };

        textOptions.font = font;

        text1 = createMesh(new THREE.TextGeometry(options.text, textOptions));
        text1.position.z = -100;
        text1.position.y = 100;
        //scene.add(text1);

        editor.execute(new AddObjectCommand(text1));

    });
}

(function() {

    function setOrPush(target, val) {
        var result = val;
        if (target) {
            result = [target];
            result.push(val);
        }
        return result;
    }


    function getFormResults(formElement) {
        var formElements = formElement.elements;
        var formParams = {};
        var i = 0;
        var elem = null;
        for (i = 0; i < formElements.length; i += 1) {
            elem = formElements[i];
            switch (elem.type) {
                case 'submit':
                    break;
                case 'button':
                    break;
                case 'radio':
                    if (elem.checked) {
                        formParams[elem.name] = elem.value;
                    }
                    break;
                case 'checkbox':
                    if (elem.checked) {
                        formParams[elem.name] = setOrPush(formParams[elem.name], elem.value);
                    }
                    break;
                default:
                    formParams[elem.name] = setOrPush(formParams[elem.name], elem.value);
            }
        }
        return formParams;
    }
    ModalManager.closeModal = function(modalId) {
        var modal = document.getElementById(modalId);
        modal.style.display = "none";
    }
    ModalManager.openModal = function(modalId) {
        // signals.transformModeChanged.dispatch( 'scale' );
        // Get the modal
        var modal = document.getElementById(modalId);

        // Get the <span> element that closes the modal
        var closeEle = document.getElementsByClassName("close")[0];

        // Get the <span> element that closes the modal
        var submitEle = document.getElementsByClassName("submit")[0];

        // When the user clicks on <span> (x), close the modal
        closeEle.onclick = function() {
            modal.style.display = "none";
        }

        submitEle.onclick = function() {
            var formData = getFormResults(this.parentElement);
            console.log(formData);
            insert3DText(formData);
            modal.style.display = "none";
        }
            // if (event.target == modal) {
        modal.style.display = "block";
        // }

    }
})();
